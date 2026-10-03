(() => {
  const shell = document.getElementById('groups-shell');
  const opener = document.getElementById('open-tab-groups');
  const closer = document.getElementById('close-tab-groups');
  const query = document.getElementById('group-query');
  const grid = document.getElementById('group-grid');
  const path = document.getElementById('group-path');
  const count = document.getElementById('group-count');
  const colors = { grey:'#bbc4d1', blue:'#86aeff', red:'#ff909d', yellow:'#ffe080', green:'#84d8aa', pink:'#ff8cce', purple:'#c394ff', cyan:'#78e4f2', orange:'#ffb47d' };
  let groups = [], selected = null, previousFocus;

  function crumb(label, action, disabled = false) {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = label; button.disabled = disabled;
    if (action) button.addEventListener('click', action);
    return button;
  }
  function empty(message) {
    const p = document.createElement('p'); p.className = 'bookmark-empty'; p.textContent = message;
    grid.replaceChildren(p);
  }
  function groupTile(group) {
    const button = document.createElement('button'); button.type = 'button';
    button.className = 'bookmark-tile group-tile';
    button.style.setProperty('--group-color', colors[group.color] || colors.grey);
    const icon = document.createElement('span'); icon.className = 'group-icon'; icon.textContent = '◎';
    const title = document.createElement('span'); title.className = 'bookmark-label'; title.textContent = group.title || 'Untitled group';
    const meta = document.createElement('small'); meta.className = 'bookmark-where'; meta.textContent = `${group.tabs.length} TABS`;
    button.append(icon,title,meta);
    button.addEventListener('click', () => { selected = group.id; query.value = ''; render(); });
    return button;
  }
  function tabTile(tab) {
    const button = document.createElement('button'); button.type = 'button';
    button.className = 'bookmark-tile group-tile';
    const icon = document.createElement('span'); icon.className = 'group-icon tab-icon';
    icon.textContent = (tab.title || 'Tab').trim().slice(0,1).toUpperCase();
    const title = document.createElement('span'); title.className = 'bookmark-label'; title.textContent = tab.title || 'Untitled tab';
    const meta = document.createElement('small'); meta.className = 'bookmark-where';
    try { meta.textContent = new URL(tab.url).hostname; } catch { meta.textContent = 'Chrome tab'; }
    button.append(icon,title,meta);
    button.title = tab.title || tab.url || 'Open tab';
    button.addEventListener('click', async () => {
      try {
        await chrome.windows.update(tab.windowId,{focused:true});
        await chrome.tabs.update(tab.id,{active:true});
        close();
      } catch { count.textContent = 'TAB IS NO LONGER OPEN'; load(); }
    });
    return button;
  }
  function render() {
    const term = query.value.trim().toLocaleLowerCase();
    const group = groups.find(item => item.id === selected);
    path.replaceChildren(crumb('Open tab groups', () => { selected = null; query.value = ''; render(); }, !group && !term));
    if (group && !term) { const slash = document.createElement('span'); slash.textContent = '/'; path.append(slash,crumb(group.title || 'Untitled group', null, true)); }
    const items = term ? groups.flatMap(g => g.tabs.filter(t => `${g.title || ''} ${t.title || ''} ${t.url || ''}`.toLocaleLowerCase().includes(term))) : group ? group.tabs : groups;
    grid.replaceChildren(...items.map(item => item.tabs ? groupTile(item) : tabTile(item)));
    if (!items.length) empty(term ? 'No matching open tabs found.' : group ? 'This group has no open tabs.' : 'No open tab groups found. Open a group in Chrome to see it here.');
    count.textContent = `${items.length} ${term ? 'RESULTS' : group ? 'OPEN TABS' : 'OPEN GROUPS'}`;
  }
  async function load() {
    if (!chrome.tabGroups?.query || !chrome.tabs?.query) { empty('Tab group access unavailable. Reload the extension.'); count.textContent = 'ACCESS UNAVAILABLE'; return; }
    try {
      const found = await chrome.tabGroups.query({});
      groups = await Promise.all(found.map(async group => ({...group,tabs:await chrome.tabs.query({groupId:group.id})})));
      groups.sort((a,b) => a.windowId - b.windowId || a.id - b.id);
      if (!groups.some(g => g.id === selected)) selected = null;
      render();
    } catch { empty('Could not load tab groups. Reload the extension and allow tab access.'); count.textContent = 'COULD NOT LOAD'; }
  }
  function close() { shell.hidden = true; document.body.classList.remove('launcher-open'); previousFocus?.focus(); }
  opener.addEventListener('click', () => { previousFocus = document.activeElement; shell.hidden = false; document.body.classList.add('launcher-open'); query.focus(); load(); });
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
  ['onCreated','onRemoved','onUpdated','onMoved'].forEach(name => chrome.tabGroups?.[name]?.addListener(() => { if (!shell.hidden) load(); }));
  ['onCreated','onRemoved','onUpdated','onAttached','onDetached'].forEach(name => chrome.tabs?.[name]?.addListener(() => { if (!shell.hidden) load(); }));
})();
