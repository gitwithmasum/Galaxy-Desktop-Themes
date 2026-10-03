(() => {
  const shell = document.getElementById('bookmarks-shell');
  const opener = document.getElementById('open-bookmarks');
  const closer = document.getElementById('close-bookmarks');
  const query = document.getElementById('bookmark-query');
  const grid = document.getElementById('bookmark-grid');
  const path = document.getElementById('bookmark-path');
  const count = document.getElementById('bookmark-count');
  let root, current, lastFocus;
  const nodes = new Map();
  const palettes = [185, 220, 270, 325, 25, 145];

  function index(node) {
    nodes.set(node.id, node);
    (node.children || []).forEach(index);
  }
  function folderName(node) {
    return node.title || (node.id === root?.id ? 'All bookmarks' : 'Folder');
  }
  function ancestors(node) {
    const list = [];
    while (node) { list.unshift(node); node = nodes.get(node.parentId); }
    return list;
  }
  function iconData(node) {
    if (!node.url) return { mark: '▣', hue: 215 };
    let host;
    try { host = new URL(node.url).hostname.replace(/^www\./, ''); } catch { host = ''; }
    const names = { 'chatgpt.com':'✳', 'github.com':'⌘', 'youtube.com':'▶', 'mail.google.com':'M', 'drive.google.com':'△', 'docs.google.com':'▤', 'figma.com':'◈', 'spotify.com':'♫', 'netflix.com':'N' };
    const mark = names[host] || (node.title || host || '?').trim().slice(0, 1).toUpperCase();
    const hash = [...host].reduce((n, c) => n + c.charCodeAt(0), 0);
    return { mark, hue: palettes[hash % palettes.length] };
  }
  function tile(node, searching = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'bookmark-tile';
    const { mark, hue } = iconData(node);
    const icon = document.createElement('span');
    icon.className = 'bookmark-icon';
    icon.style.setProperty('--tile-hue', hue);
    icon.textContent = mark;
    const label = document.createElement('span');
    label.className = 'bookmark-label';
    label.textContent = folderName(node);
    button.append(icon, label);
    if (searching) {
      const where = document.createElement('small');
      where.className = 'bookmark-where';
      where.textContent = folderName(nodes.get(node.parentId) || root);
      button.append(where);
    }
    button.title = node.url || `${folderName(node)} — folder`;
    button.addEventListener('click', event => {
      if (!node.url) { current = node; query.value = ''; render(); return; }
      if (!/^https?:\/\//i.test(node.url)) return;
      if (event.ctrlKey || event.metaKey || event.shiftKey) window.open(node.url, '_blank', 'noopener');
      else window.location.assign(node.url);
    });
    return button;
  }
  function renderPath(searching) {
    path.replaceChildren();
    const chain = searching ? [root] : ancestors(current);
    chain.forEach((node, i) => {
      const crumb = document.createElement('button');
      crumb.type = 'button';
      crumb.textContent = folderName(node);
      crumb.disabled = i === chain.length - 1;
      crumb.addEventListener('click', () => { current = node; query.value = ''; render(); });
      if (i) { const slash = document.createElement('span'); slash.textContent = '/'; path.append(slash); }
      path.append(crumb);
    });
    if (searching) { const slash = document.createElement('span'); slash.textContent = '/'; path.append(slash); const term = document.createElement('span'); term.textContent = 'Search results'; path.append(term); }
  }
  function render() {
    if (!root) return;
    if (!nodes.has(current.id)) current = root;
    const term = query.value.trim().toLocaleLowerCase();
    let items;
    if (term) items = [...nodes.values()].filter(n => n !== root && `${n.title} ${n.url || ''}`.toLocaleLowerCase().includes(term));
    else items = [...(current.children || [])].sort((a, b) => Number(!!a.url) - Number(!!b.url));
    renderPath(!!term);
    grid.replaceChildren(...items.map(n => tile(n, !!term)));
    if (!items.length) { const empty = document.createElement('p'); empty.className = 'bookmark-empty'; empty.textContent = term ? 'No matching bookmarks found.' : 'This folder is empty. Add bookmarks in Chrome to see them here.'; grid.append(empty); }
    count.textContent = `${items.length} ${term ? 'RESULTS' : 'APPS & FOLDERS'}`;
  }
  async function load() {
    if (!chrome.bookmarks?.getTree) { count.textContent = 'BOOKMARK ACCESS UNAVAILABLE'; return; }
    try {
      const tree = await chrome.bookmarks.getTree();
      nodes.clear(); root = tree[0]; index(root);
      current = nodes.get(current?.id) || root;
      render();
    } catch (error) { count.textContent = 'COULD NOT LOAD BOOKMARKS'; grid.textContent = 'Reload the extension and allow bookmark access.'; }
  }
  function close() { shell.hidden = true; document.body.classList.remove('launcher-open'); lastFocus?.focus(); }
  opener.addEventListener('click', () => { lastFocus = document.activeElement; shell.hidden = false; document.body.classList.add('launcher-open'); query.focus(); load(); });
  closer.addEventListener('click', close);
  shell.addEventListener('click', event => { if (event.target === shell) close(); });
  query.addEventListener('input', render);
  document.addEventListener('keydown', event => {
    if (shell.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === '/' && document.activeElement !== query) { event.preventDefault(); query.focus(); }
    if (event.key === 'Tab') {
      const focusable = [...shell.querySelectorAll('button:not([disabled]), input')].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  ['onCreated','onRemoved','onChanged','onMoved','onChildrenReordered'].forEach(name => chrome.bookmarks?.[name]?.addListener(() => { if (!shell.hidden) load(); }));
})();
