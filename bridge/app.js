const $ = id => document.getElementById(id);
const unlock = $('unlock');
const workspace = $('workspace');
let refreshTimer;

async function request(path, options = {}) {
  const response = await fetch(path, { cache: 'no-store', credentials: 'same-origin', ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function feedback(message, target = 'action-message') {
  $(target).textContent = message;
}

function showLocked() {
  unlock.hidden = false;
  workspace.hidden = true;
  clearInterval(refreshTimer);
}

function showReady() {
  unlock.hidden = true;
  workspace.hidden = false;
  loadItems();
  clearInterval(refreshTimer);
  refreshTimer = setInterval(() => { if (!document.hidden) loadItems(true); }, 4000);
}

function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function button(label, click, className = '') {
  const el = element('button', className, label);
  el.type = 'button';
  el.addEventListener('click', click);
  return el;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const box = document.createElement('textarea');
    box.value = value;
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.append(box);
    box.select();
    const success = document.execCommand('copy');
    box.remove();
    if (!success) throw new Error('Select the text and copy it manually.');
  }
  feedback('Copied to clipboard.');
}

function render(items) {
  const list = $('items');
  list.replaceChildren();
  if (!items.length) {
    list.append(element('div', 'item', 'Your shared notes and files will appear here.'));
    return;
  }
  for (const item of items) {
    const card = element('article', 'item');
    card.append(element('div', 'item-icon', item.kind === 'file' ? '⇩' : '✎'));
    const body = element('div', 'item-body');
    const time = new Date(item.created).toLocaleString();
    body.append(element('div', 'item-meta', (item.kind === 'file' ? 'FILE' : 'NOTE') + '  ·  ' + time));
    const content = element('p', 'item-content');
    const text = item.kind === 'file' ? item.name : item.text;
    if (item.kind === 'note' && /^https?:\/\/[^\s]+$/i.test(text)) {
      const a = element('a', '', text);
      a.href = text;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      content.append(a);
    } else content.textContent = text;
    body.append(content);
    card.append(body);
    const actions = element('div', 'item-actions');
    if (item.kind === 'file') {
      const a = element('a', '', 'DOWNLOAD');
      a.href = '/api/file?id=' + encodeURIComponent(item.id);
      const wrap = element('button', '', 'DOWNLOAD');
      wrap.type = 'button';
      wrap.addEventListener('click', () => { window.location.href = a.href; });
      actions.append(wrap);
    } else actions.append(button('COPY', () => copyText(item.text).catch(err => feedback(err.message))));
    actions.append(button('DELETE', async () => {
      if (!confirm('Remove this item from the bridge?')) return;
      try {
        await request('/api/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id }) });
        await loadItems();
      } catch (err) { feedback(err.message); }
    }, 'delete'));
    card.append(actions);
    list.append(card);
  }
}

async function loadItems(quiet = false) {
  try {
    const data = await request('/api/items');
    render(data.items);
  } catch (err) {
    if (err.message.includes('unlock') || err.message.includes('PIN')) showLocked();
    else if (!quiet) feedback(err.message);
  }
}

$('login-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    await request('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: $('pin').value }) });
    $('pin').value = '';
    feedback('', 'login-message');
    showReady();
  } catch (err) { feedback(err.message, 'login-message'); }
});

$('note-form').addEventListener('submit', async event => {
  event.preventDefault();
  const text = $('note').value.trim();
  if (!text) return;
  try {
    await request('/api/note', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    $('note').value = '';
    feedback('Sent. Open the bridge on your other device to see it.');
    await loadItems();
  } catch (err) { feedback(err.message); }
});

$('file').addEventListener('change', () => {
  $('file-name').textContent = $('file').files[0]?.name || 'No file selected';
});
$('file-form').addEventListener('submit', async event => {
  event.preventDefault();
  const file = $('file').files[0];
  if (!file) return;
  if (file.size > 25 * 1024 * 1024) { feedback('Choose a file smaller than 25 MB.'); return; }
  const submit = event.currentTarget.querySelector('button');
  submit.disabled = true;
  feedback('Uploading ' + file.name + ' ...');
  try {
    const data = new FormData();
    data.append('file', file);
    await request('/api/upload', { method: 'POST', body: data });
    $('file-form').reset();
    $('file-name').textContent = 'No file selected';
    feedback('File ready on both devices.');
    await loadItems();
  } catch (err) { feedback(err.message); }
  finally { submit.disabled = false; }
});

$('refresh').addEventListener('click', () => loadItems());
$('logout').addEventListener('click', async () => {
  try { await request('/api/logout', { method: 'POST' }); } catch {}
  showLocked();
});

request('/api/session').then(data => data.authenticated ? showReady() : showLocked()).catch(showLocked);
