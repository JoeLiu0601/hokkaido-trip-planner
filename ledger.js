(() => {
  'use strict';
  const L = window.TripLedger;
  const key = 'hokkaido-ledger-preview-v1';
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  let book = L.empty(), currency = 'JPY', tab = 'expenses', demo = false;
  let lastStored = null, blocked = false, undoSnapshot = null, editingId = null, kind = 'expense', formBase = null, pendingImport = null;
  let renderedMembers = '';
  function notice(message) { $('page-message').textContent = message; $('page-message').hidden = !message; }
  function load() {
    blocked = false;
    try { lastStored = localStorage.getItem(key); book = lastStored ? L.validate(JSON.parse(lastStored)) : L.empty(); }
    catch { book = L.empty(); blocked = true; notice('目前無法讀取帳本，已保留原資料。請先匯出備份；修復前不會覆寫原帳本。'); }
  }
  function commit(next, message, allowRepair = false) {
    const clean = L.validate(next);
    const before = { book, raw: lastStored, blocked };
    if (!demo) {
      if (blocked && !allowRepair) throw Error('目前帳本無法讀取，請先匯出原始備份，再匯入可用的備份。');
      if (localStorage.getItem(key) !== lastStored) throw Error('另一個分頁已更新帳本。請關閉表單、重新整理後再操作，避免蓋掉新資料。');
      const serialized = JSON.stringify(clean);
      try { localStorage.setItem(key, serialized); }
      catch { throw Error('儲存失敗，這筆尚未存入帳本。請檢查瀏覽器儲存空間後重試。'); }
      lastStored = serialized;
    }
    book = clean; blocked = false; undoSnapshot = before;
    $('undo-message').textContent = message; $('undo-bar').hidden = false;
    render(); notice(demo ? `${message} · 僅修改範例` : `${message} · 已存到此裝置`);
  }
  function sample() {
    const b = L.empty();
    b.members.forEach((m, i) => { m.name = ['我', '小安', '小晴', '阿哲'][i]; });
    const all = b.members.map(m => m.id);
    const rows = [
      ['sample-dinner', '大家一起吃晚餐', '2026-12-24', 'JPY', 12000, 'p1', all],
      ['sample-taxi', '市區組計程車', '2026-12-27', 'JPY', 2400, 'p2', ['p1', 'p2']],
      ['sample-ski', '滑雪組纜車票', '2026-12-27', 'JPY', 11000, 'p3', ['p3', 'p4']],
      ['sample-car', '租車先付訂金', '2026-10-30', 'TWD', 800000, 'p2', all]
    ];
    b.entries = rows.map(([id, title, date, currency, amount, payer, participants]) => L.expense({ id, title, date, currency, amount, payer, participants }, b.members));
    return b;
  }
  const name = id => book.members.find(m => m.id === id)?.name || '旅伴';
  function render() {
    $('demo-banner').hidden = !demo;
    $('start-demo').hidden = demo;
    $('import-ledger').disabled = demo;
    document.querySelectorAll('[data-currency]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.currency === currency)));
    document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === tab)));
    $('expenses-panel').hidden = tab !== 'expenses'; $('settlement-panel').hidden = tab !== 'settlement';
    const entries = book.entries.filter(e => e.currency === currency);
    const expenses = entries.filter(e => e.kind === 'expense');
    $('total-spend').textContent = L.format(expenses.reduce((sum, e) => sum + e.amount, 0), currency);
    $('entry-count').textContent = expenses.length ? `${expenses.length} 筆支出 · ${entries.length - expenses.length} 筆還款` : '還沒有支出';
    const transfers = L.settlements(book, currency);
    $('transfer-count').textContent = `${transfers.length} 筆`;
    $('entry-list').innerHTML = entries.length ? [...entries].reverse().map(e => `
      <article class="entry-card ${e.kind === 'repayment' ? 'entry-repayment' : ''}">
        <div class="entry-heading"><div><strong>${esc(e.title)}</strong><time class="entry-date" datetime="${e.date}">${e.date.replaceAll('-', '.')}</time></div><strong class="entry-amount">${L.format(e.amount, currency)}</strong></div>
        <p class="entry-description">${e.kind === 'repayment' ? `${esc(name(e.payer))} 已還給 ${esc(name(e.recipient))}` : `${esc(name(e.payer))} 先付 · ${Object.keys(e.shares).map(id => esc(name(id))).join('、')} 分攤`}</p>
        <div class="entry-actions"><button type="button" data-edit="${e.id}" aria-label="編輯${esc(e.title)}">編輯</button><button type="button" data-delete="${e.id}" aria-label="移除${esc(e.title)}">移除</button></div>
      </article>`).join('') : `<div class="empty-state"><span aria-hidden="true">☕</span><h2>第一筆，從誰先付開始？</h2><p>晚餐、車資、住宿都能記。<br>按「記一筆」，其他的交給帳本。</p></div>`;
    const balances = L.balances(book, currency);
    $('balance-grid').innerHTML = book.members.map(m => `<div class="balance-card"><span>${esc(m.name)}</span><strong>${L.format(Math.abs(balances[m.id]), currency)}</strong><small>${balances[m.id] > 0 ? '還可以收回' : balances[m.id] < 0 ? '還需要付出' : '目前已結清'}</small></div>`).join('');
    $('transfer-list').innerHTML = transfers.length ? transfers.map((t, i) => `<article class="transfer-card"><div><p>${esc(name(t.payer))} <span aria-hidden="true">→</span> ${esc(name(t.recipient))}</p><strong>${L.format(t.amount, currency)}</strong></div><button type="button" data-repay="${i}">記錄已還款</button></article>`).join('') : `<div class="empty-state"><span aria-hidden="true">✓</span><h2>${entries.length ? '這個幣別都結清了' : '記下支出，就會算給你看'}</h2><p>${entries.length ? '一起花的錢，清清楚楚。' : '每個人的代墊與分攤會一起計算。'}</p></div>`;
    const memberSignature = JSON.stringify(book.members);
    if (memberSignature !== renderedMembers) {
      $('member-fields').innerHTML = book.members.map((m, i) => `<label>旅伴 ${i + 1}<input name="${m.id}" value="${esc(m.name)}" maxlength="20" autocomplete="off" required></label>`).join('');
      renderedMembers = memberSignature;
    }
  }
  function participantIds() { return [...$('participant-fields').querySelectorAll('input:checked')].map(i => i.value); }
  function updateSplitFields(values) {
    const selected = participantIds();
    const old = values || Object.fromEntries([...$('custom-fields').querySelectorAll('input')].map(i => [i.dataset.person, i.value]));
    $('custom-fields').innerHTML = selected.map(id => `<label>${esc(name(id))}<input data-person="${id}" inputmode="decimal" type="text" value="${esc(old[id] || '')}" placeholder="0" aria-label="${esc(name(id))}的分攤金額"></label>`).join('');
    $('custom-fields').hidden = !$('custom-split').checked;
    preview();
  }
  function formInput() {
    const selected = participantIds();
    const c = $('expense-currency').value;
    return { id: editingId || crypto.randomUUID(), kind, title: $('expense-title').value, date: $('expense-date').value, currency: c, amount: L.money($('expense-amount').value, c), payer: $('expense-payer').value, recipient: $('repayment-recipient').value, participants: selected, custom: $('custom-split').checked ? Object.fromEntries([...$('custom-fields').querySelectorAll('input')].map(i => [i.dataset.person, L.money(i.value || '0', c)])) : null };
  }
  function preview() {
    if (kind !== 'expense') return;
    try {
      const e = L.expense(formInput(), book.members);
      $('split-preview').textContent = Object.entries(e.shares).map(([id, n]) => `${name(id)}：${L.format(n, e.currency)}`).join('\n') + (!$('custom-split').checked ? '\n零頭依上方旅伴順序分配，加總與總金額一致。' : '');
    } catch { $('split-preview').textContent = '填好項目與金額後，這裡會列出每人的分攤。'; }
  }
  function openEntry(entry, transfer) {
    editingId = entry?.id || null; kind = entry?.kind || (transfer ? 'repayment' : 'expense');
    formBase = lastStored;
    $('entry-form').reset(); $('form-error').hidden = true;
    $('form-title').textContent = kind === 'repayment' ? '記錄已還款' : editingId ? '編輯這筆支出' : '記一筆支出';
    $('form-eyebrow').textContent = kind === 'repayment' ? 'ALL SQUARE' : 'SHARED MOMENTS';
    $('save-entry').textContent = kind === 'repayment' ? '確認已收到還款' : '儲存這筆';
    $('payer-label').textContent = kind === 'repayment' ? '誰還款' : '誰先付';
    $('title-field').hidden = kind === 'repayment'; $('split-field').hidden = kind === 'repayment';
    $('recipient-field').hidden = kind !== 'repayment'; $('repayment-note').hidden = kind !== 'repayment';
    $('expense-title').value = entry?.title || '';
    const e = entry || transfer;
    $('expense-currency').value = e?.currency || currency;
    $('expense-amount').value = e ? L.amountText(e.amount, e.currency) : '';
    $('expense-date').value = entry?.date || today();
    const options = book.members.map(m => `<option value="${m.id}">${esc(m.name)}</option>`).join('');
    $('expense-payer').innerHTML = options; $('repayment-recipient').innerHTML = options;
    $('expense-payer').value = e?.payer || 'p1'; $('repayment-recipient').value = e?.recipient || 'p2';
    const selected = book.members.filter(m => !entry?.shares || Object.hasOwn(entry.shares, m.id)).map(m => m.id);
    $('participant-fields').innerHTML = book.members.map(m => `<label><input type="checkbox" value="${m.id}" ${selected.includes(m.id) ? 'checked' : ''}>${esc(m.name)}</label>`).join('');
    // Keep ordinary equal bills easy to edit while preserving unequal allocations.
    const equalShares = entry?.shares ? L.expense({ ...entry, participants: selected, custom: null }, book.members).shares : null;
    $('custom-split').checked = Boolean(entry?.shares && selected.some(id => entry.shares[id] !== equalShares[id]));
    updateSplitFields(entry?.shares ? Object.fromEntries(Object.entries(entry.shares).map(([id, n]) => [id, L.amountText(n, entry.currency)])) : {});
    $('entry-dialog').showModal();
    (kind === 'repayment' ? $('expense-amount') : $('expense-title')).focus();
  }
  function submitError(e) { $('form-error').textContent = e.message || '無法儲存，請再確認內容。'; $('form-error').hidden = false; }
  $('entry-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      if (!demo && formBase !== localStorage.getItem(key)) throw Error('另一分頁已更新帳本，請關閉表單、重新整理後再操作。');
      const input = formInput();
      const entry = kind === 'repayment' ? L.repayment(input, book.members) : L.expense(input, book.members);
      const entries = [...book.entries];
      const index = entries.findIndex(e => e.id === editingId);
      if (editingId && index < 0) throw Error('原紀錄已不存在，請重新整理。');
      if (index >= 0) entries[index] = entry; else entries.push(entry);
      commit({ ...book, entries }, kind === 'repayment' ? '已記錄還款' : editingId ? '已更新支出' : '已新增支出');
      $('entry-dialog').close();
    } catch (e) { submitError(e); }
  });
  $('close-dialog').addEventListener('click', () => $('entry-dialog').close());
  $('cancel-dialog').addEventListener('click', () => $('entry-dialog').close());
  $('add-expense').addEventListener('click', () => openEntry());
  $('expense-title').addEventListener('input', preview);
  $('expense-amount').addEventListener('input', preview);
  $('expense-currency').addEventListener('change', preview);
  $('participant-fields').addEventListener('change', () => updateSplitFields());
  $('custom-split').addEventListener('change', () => updateSplitFields());
  $('custom-fields').addEventListener('input', preview);
  $('entry-list').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit]');
    if (edit) { openEntry(book.entries.find(e => e.id === edit.dataset.edit)); return; }
    const remove = event.target.closest('[data-delete]');
    if (!remove) return;
    try { commit({ ...book, entries: book.entries.filter(e => e.id !== remove.dataset.delete) }, '已移除紀錄'); }
    catch (e) { notice(e.message); }
  });
  $('transfer-list').addEventListener('click', event => {
    const button = event.target.closest('[data-repay]');
    if (button) openEntry(null, L.settlements(book, currency)[Number(button.dataset.repay)]);
  });
  document.querySelectorAll('[data-currency]').forEach(button => button.addEventListener('click', () => { currency = button.dataset.currency; render(); }));
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => { tab = button.dataset.tab; render(); }));
  $('members-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      const values = new FormData(event.currentTarget);
      commit({ ...book, members: book.members.map(m => ({ ...m, name: values.get(m.id) })) }, '已更新旅伴名字');
    } catch (e) { notice(e.message); }
  });
  $('undo').addEventListener('click', () => {
    if (!undoSnapshot) return;
    try {
      if (!demo) {
        if (localStorage.getItem(key) !== lastStored) throw Error('另一分頁已更新帳本，請重新整理後再確認。');
        if (undoSnapshot.raw === null) localStorage.removeItem(key); else localStorage.setItem(key, undoSnapshot.raw);
        lastStored = undoSnapshot.raw;
      }
      book = undoSnapshot.book; blocked = undoSnapshot.blocked; undoSnapshot = null;
      $('undo-bar').hidden = true; render(); notice('已復原上一個操作。');
    } catch (e) { notice(`無法復原：${e.message}`); }
  });
  function enterDemo() { demo = true; book = sample(); undoSnapshot = null; $('undo-bar').hidden = true; notice(''); render(); }
  $('start-demo').addEventListener('click', enterDemo);
  $('leave-demo').addEventListener('click', () => { demo = false; undoSnapshot = null; $('undo-bar').hidden = true; notice(''); load(); render(); });
  $('export-ledger').addEventListener('click', () => {
    const contents = blocked && lastStored ? lastStored : JSON.stringify(book, null, 2);
    const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `北海道分帳${demo ? '-範例' : ''}-${today()}.json`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notice(demo ? '已匯出範例帳本；你的帳本未變更。' : '已送出備份下載，請確認檔案已保存。');
  });
  $('import-ledger').addEventListener('change', async event => {
    const file = event.target.files[0]; event.target.value = '';
    if (!file || demo) return;
    try {
      if (file.size > 2000000) throw Error('備份檔請小於 2 MB。');
      pendingImport = L.validate(JSON.parse(await file.text()));
      $('import-description').textContent = `${pendingImport.members.map(m => m.name).join('、')}，共 ${pendingImport.entries.length} 筆紀錄。`;
      $('import-dialog').showModal();
    } catch (e) { pendingImport = null; notice(`無法匯入：${e.message}`); }
  });
  $('cancel-import').addEventListener('click', () => { pendingImport = null; $('import-dialog').close(); });
  $('confirm-import').addEventListener('click', () => {
    if (!pendingImport) return;
    try { commit(pendingImport, '已匯入帳本', true); pendingImport = null; $('import-dialog').close(); }
    catch (e) { notice(e.message); $('import-dialog').close(); }
  });
  window.addEventListener('storage', event => {
    if (event.key !== key || demo) return;
    if ($('entry-dialog').open || $('import-dialog').open) { notice('另一分頁已更新帳本，請先關閉表單並重新整理。'); return; }
    undoSnapshot = null; $('undo-bar').hidden = true; load(); render();
    if (!blocked) notice('已載入另一分頁更新的帳本。');
  });
  let theme = 'light';
  try { theme = localStorage.getItem('hokkaido-planner-theme') === 'dark' ? 'dark' : 'light'; } catch { /* Theme remains available without storage. */ }
  function paintTheme() {
    document.body.dataset.theme = theme;
    const label = theme === 'dark' ? '淺色' : '深色';
    $('theme-toggle').textContent = `${theme === 'dark' ? '☀' : '☾'} ${label}`;
    $('theme-toggle').setAttribute('aria-label', `切換至${label}模式`);
  }
  $('theme-toggle').addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; paintTheme(); try { localStorage.setItem('hokkaido-planner-theme', theme); } catch { /* In-memory theme only. */ } });
  load();
  if (new URLSearchParams(location.search).get('demo') === '1') enterDemo(); else render();
  paintTheme();
})();
