"""Masum Galaxy Bridge: a PIN-protected local Wi-Fi file and text exchange.

Python 3.9+ standard library only. Run from Windows using START-BRIDGE.bat.
"""

from __future__ import annotations

import hmac
import ipaddress
import json
import os
import re
import secrets
import socket
import threading
import time
import uuid
import webbrowser
from datetime import datetime, timezone
from email import policy
from email.parser import BytesParser
from http import cookies
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote, urlsplit


HERE = Path(__file__).resolve().parent
DATA_DIR = Path.home() / "Masum-Galaxy-Bridge"
MAX_UPLOAD = 25 * 1024 * 1024
MAX_NOTE = 4000
PORT = 8765
PIN = f"{secrets.randbelow(1_000_000):06d}"


class BridgeState:
    def __init__(self, directory: Path = DATA_DIR, pin: str = PIN):
        self.directory = directory
        self.files = directory / "files"
        self.db_path = directory / "items.json"
        self.directory.mkdir(parents=True, exist_ok=True)
        self.files.mkdir(exist_ok=True)
        self.items = json.loads(self.db_path.read_text(encoding="utf-8")) if self.db_path.exists() else []
        self.pin = pin
        self.sessions: dict[str, float] = {}
        self.attempts: dict[str, list[float]] = {}
        self.lock = threading.RLock()

    def save(self):
        staging = self.db_path.with_suffix(".tmp")
        staging.write_text(json.dumps(self.items, ensure_ascii=False, indent=2), encoding="utf-8")
        os.replace(staging, self.db_path)

    def add(self, item: dict):
        with self.lock:
            self.items.insert(0, item)
            self.save()

    def remove(self, item_id: str) -> bool:
        with self.lock:
            item = next((entry for entry in self.items if entry["id"] == item_id), None)
            if item is None:
                return False
            self.items.remove(item)
            self.save()
            if item["kind"] == "file":
                (self.files / item["stored"]).unlink(missing_ok=True)
            return True


def handler_for(state: BridgeState):
    class Handler(BaseHTTPRequestHandler):
        server_version = "GalaxyBridge/1.0"

        def setup(self):
            super().setup()
            self.connection.settimeout(45)

        def log_message(self, fmt, *args):
            # Paths can contain user content; keep the console log compact.
            print(f"[{self.client_address[0]}] {self.command} {urlsplit(self.path).path}")

        def headers_common(self, size: int, mime: str = "application/json; charset=utf-8"):
            self.send_header("Content-Type", mime)
            self.send_header("Content-Length", str(size))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("X-Frame-Options", "DENY")
            self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")

        def respond(self, status: int, data: dict, cookie: str = ""):
            body = json.dumps(data, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.headers_common(len(body))
            if cookie:
                self.send_header("Set-Cookie", cookie)
            self.end_headers()
            self.wfile.write(body)

        def is_local_host(self) -> bool:
            host = self.headers.get("Host", "").split(":")[0].strip("[]")
            if host == "localhost":
                return True
            try:
                address = ipaddress.ip_address(host)
                return address.is_private or address.is_loopback
            except ValueError:
                return False

        def authenticated(self) -> bool:
            parsed = cookies.SimpleCookie()
            try:
                parsed.load(self.headers.get("Cookie", ""))
            except cookies.CookieError:
                return False
            token = parsed.get("bridge_session")
            if not token:
                return False
            with state.lock:
                expiry = state.sessions.get(token.value, 0)
            return expiry > time.time()

        def read_body(self, limit: int) -> bytes | None:
            try:
                length = int(self.headers.get("Content-Length", "-1"))
            except ValueError:
                length = -1
            if length < 0 or length > limit:
                self.respond(413, {"error": "Request is too large or missing its length."})
                return None
            body = self.rfile.read(length)
            if len(body) != length:
                self.respond(400, {"error": "Incomplete upload."})
                return None
            return body

        def do_GET(self):
            if not self.is_local_host():
                self.respond(403, {"error": "Use the local IP address shown on your laptop."})
                return
            path = urlsplit(self.path).path
            if path in ("/", "/app.js", "/style.css", "/assets/galaxy.jpg", "/favicon.ico"):
                assets = {
                    "/": (HERE / "index.html", "text/html; charset=utf-8"),
                    "/app.js": (HERE / "app.js", "text/javascript; charset=utf-8"),
                    "/style.css": (HERE / "style.css", "text/css; charset=utf-8"),
                    "/assets/galaxy.jpg": (HERE / "assets" / "galaxy.jpg", "image/jpeg"),
                }
                if path == "/favicon.ico":
                    self.send_response(204)
                    self.end_headers()
                    return
                file, mime = assets[path]
                body = file.read_bytes()
                self.send_response(200)
                self.headers_common(len(body), mime)
                self.end_headers()
                self.wfile.write(body)
                return
            if path == "/api/session":
                self.respond(200, {"authenticated": self.authenticated()})
                return
            if not self.authenticated():
                self.respond(401, {"error": "Enter the PIN shown on your laptop."})
                return
            if path == "/api/items":
                with state.lock:
                    items = [{k: v for k, v in entry.items() if k != "stored"} for entry in state.items]
                self.respond(200, {"items": items})
                return
            if path == "/api/file":
                item_id = parse_qs(urlsplit(self.path).query).get("id", [""])[0]
                with state.lock:
                    entry = next((x.copy() for x in state.items if x["id"] == item_id and x["kind"] == "file"), None)
                if entry is None:
                    self.respond(404, {"error": "File not found."})
                    return
                file = state.files / entry["stored"]
                if not file.is_file():
                    self.respond(404, {"error": "File is missing from laptop storage."})
                    return
                self.send_response(200)
                self.headers_common(file.stat().st_size, "application/octet-stream")
                self.send_header("Content-Disposition", "attachment; filename*=UTF-8''" + quote(entry["name"]))
                self.end_headers()
                with file.open("rb") as source:
                    while block := source.read(65536):
                        self.wfile.write(block)
                return
            self.respond(404, {"error": "Not found."})

        def do_POST(self):
            if not self.is_local_host():
                self.respond(403, {"error": "Use the local IP address shown on your laptop."})
                return
            origin = self.headers.get("Origin")
            if origin and origin != f"http://{self.headers.get('Host', '')}":
                self.respond(403, {"error": "This request came from another website."})
                return
            path = urlsplit(self.path).path
            if path == "/api/login":
                body = self.read_body(256)
                if body is None:
                    return
                try:
                    supplied = json.loads(body)["pin"]
                except (ValueError, KeyError, TypeError):
                    self.respond(400, {"error": "Enter the six-digit PIN."})
                    return
                ip = self.client_address[0]
                with state.lock:
                    recent = [t for t in state.attempts.get(ip, []) if time.monotonic() - t < 60]
                    if len(recent) >= 6:
                        self.respond(429, {"error": "Too many attempts. Wait one minute."})
                        return
                    if not isinstance(supplied, str) or not hmac.compare_digest(supplied, state.pin):
                        recent.append(time.monotonic())
                        state.attempts[ip] = recent
                        self.respond(403, {"error": "PIN did not match."})
                        return
                    state.attempts.pop(ip, None)
                    token = secrets.token_urlsafe(32)
                    state.sessions[token] = time.time() + 12 * 3600
                self.respond(200, {"ok": True}, f"bridge_session={token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200")
                return
            if not self.authenticated():
                self.respond(401, {"error": "Please unlock the bridge."})
                return
            if path == "/api/note":
                body = self.read_body(16 * 1024)
                if body is None:
                    return
                try:
                    note = json.loads(body)["text"]
                except (ValueError, KeyError, TypeError):
                    self.respond(400, {"error": "Text is required."})
                    return
                if not isinstance(note, str) or not 0 < len(note.strip()) <= MAX_NOTE:
                    self.respond(400, {"error": "Write up to 4,000 characters."})
                    return
                item = {"id": uuid.uuid4().hex, "kind": "note", "text": note.strip(), "created": datetime.now(timezone.utc).isoformat()}
                state.add(item)
                self.respond(201, {"item": item})
                return
            if path == "/api/upload":
                ctype = self.headers.get("Content-Type", "")
                if not ctype.lower().startswith("multipart/form-data;") or "boundary=" not in ctype:
                    self.respond(400, {"error": "Select a file to upload."})
                    return
                body = self.read_body(MAX_UPLOAD + 65536)
                if body is None:
                    return
                try:
                    mail = BytesParser(policy=policy.default).parsebytes(
                        ("Content-Type: " + ctype + "\r\nMIME-Version: 1.0\r\n\r\n").encode() + body
                    )
                    part = next((p for p in mail.iter_parts() if p.get_param("name", header="content-disposition") == "file" and p.get_filename()), None)
                    if part is None:
                        raise ValueError("No file")
                    raw_name = part.get_filename().replace("\\", "/").split("/")[-1]
                    name = "".join(c for c in raw_name if c.isprintable() and c not in '<>:"/\\|?*').strip(" .")[:120]
                    payload = part.get_payload(decode=True)
                    if not name or payload is None or len(payload) > MAX_UPLOAD:
                        raise ValueError("Invalid file")
                except (ValueError, TypeError, StopIteration):
                    self.respond(400, {"error": "Could not read this file. Limit: 25 MB."})
                    return
                stored = uuid.uuid4().hex
                (state.files / stored).write_bytes(payload)
                item = {"id": uuid.uuid4().hex, "kind": "file", "name": name, "stored": stored, "size": len(payload), "created": datetime.now(timezone.utc).isoformat()}
                state.add(item)
                self.respond(201, {"item": {k: v for k, v in item.items() if k != "stored"}})
                return
            if path == "/api/delete":
                body = self.read_body(256)
                if body is None:
                    return
                try:
                    item_id = json.loads(body)["id"]
                except (ValueError, KeyError, TypeError):
                    self.respond(400, {"error": "Item ID required."})
                    return
                if not isinstance(item_id, str) or not re.fullmatch(r"[0-9a-f]{32}", item_id):
                    self.respond(400, {"error": "Invalid item ID."})
                    return
                self.respond(200 if state.remove(item_id) else 404, {"ok": True})
                return
            if path == "/api/logout":
                parsed = cookies.SimpleCookie()
                parsed.load(self.headers.get("Cookie", ""))
                with state.lock:
                    if parsed.get("bridge_session"):
                        state.sessions.pop(parsed["bridge_session"].value, None)
                self.respond(200, {"ok": True}, "bridge_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0")
                return
            self.respond(404, {"error": "Not found."})

    return Handler


def lan_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as connection:
            connection.connect(("1.1.1.1", 80))  # Chooses an interface; sends no data.
            return connection.getsockname()[0]
    except OSError:
        try:
            return socket.gethostbyname(socket.gethostname())
        except OSError:
            return "127.0.0.1"  # Use ipconfig to find the laptop's Wi-Fi IPv4 address.


def main():
    state = BridgeState()
    server = ThreadingHTTPServer(("0.0.0.0", PORT), handler_for(state))
    server.daemon_threads = True
    local = f"http://127.0.0.1:{PORT}/"
    print("\n✦ MASUM BILLAH / GALAXY BRIDGE")
    print(f"Laptop: {local}")
    print(f"Phone:  http://{lan_ip()}:{PORT}/")
    print(f"PIN:    {state.pin}")
    print(f"Saved files: {state.directory}")
    print("Keep this window open. Press Ctrl+C to stop. Use the same private Wi-Fi.\n", flush=True)
    webbrowser.open(local)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
