(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TripLedger = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const currencies = { JPY: { label: '日圓', digits: 0 }, TWD: { label: '台幣', digits: 2 } };
  function money(value, currency) {
    const digits = currencies[currency]?.digits;
    const text = String(value).trim();
    if (digits === undefined || !(digits ? /^\d{1,9}(?:\.\d{1,2})?$/ : /^\d{1,9}$/).test(text)) throw Error(currency === 'JPY' ? '日圓請輸入整數金額。' : '金額最多保留兩位小數。');
    const [whole, fraction = ''] = text.split('.');
    const amount = Number(whole) * (10 ** digits) + Number(fraction.padEnd(digits, '0'));
    if (!Number.isSafeInteger(amount) || amount < 0) throw Error('請確認金額。');
    return amount;
  }
  function amountText(amount, currency) { return (amount / (10 ** currencies[currency].digits)).toFixed(currencies[currency].digits); }
  function format(amount, currency) {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency, minimumFractionDigits: currencies[currency].digits, maximumFractionDigits: currencies[currency].digits }).format(amount / (10 ** currencies[currency].digits));
  }
  function empty() { return { version: 1, members: ['我', '旅伴 2', '旅伴 3', '旅伴 4'].map((name, i) => ({ id: `p${i + 1}`, name })), entries: [] }; }
  function dateIsValid(value) {
    return typeof value === 'string' && /^20\d{2}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  }
  function validAmount(amount, positive = true) { return Number.isSafeInteger(amount) && amount >= (positive ? 1 : 0) && amount <= 100000000000; }
  function expense(input, members) {
    const ids = members.map(m => m.id);
    const selected = [...new Set(input.participants || [])];
    if (typeof input.title !== 'string' || !input.title.trim() || input.title.trim().length > 80) throw Error('請填寫項目，最多 80 個字。');
    if (typeof input.currency !== 'string' || !Object.hasOwn(currencies, input.currency) || !validAmount(input.amount)) throw Error('請確認幣別，金額必須大於 0。');
    if (!dateIsValid(input.date)) throw Error('請選擇有效的日期。');
    if (!ids.includes(input.payer)) throw Error('請選擇付款人。');
    if (!selected.length || selected.some(id => !ids.includes(id))) throw Error('至少選一位分攤的人。');
    const shares = {};
    if (input.custom) {
      for (const id of selected) {
        if (!validAmount(input.custom[id], false)) throw Error('請確認每人的分攤金額。');
        shares[id] = input.custom[id];
      }
      if (Object.values(shares).reduce((a, b) => a + b, 0) !== input.amount) throw Error('每人分攤加總必須等於總金額。');
    } else {
      const base = Math.floor(input.amount / selected.length);
      const remainder = input.amount % selected.length;
      selected.forEach((id, i) => { shares[id] = base + (i < remainder ? 1 : 0); });
    }
    return { id: input.id, kind: 'expense', title: input.title.trim(), date: input.date, currency: input.currency, amount: input.amount, payer: input.payer, shares };
  }
  function repayment(input, members) {
    const ids = members.map(m => m.id);
    if (typeof input.currency !== 'string' || !Object.hasOwn(currencies, input.currency) || !validAmount(input.amount)) throw Error('請確認幣別，還款金額必須大於 0。');
    if (!ids.includes(input.payer) || !ids.includes(input.recipient) || input.payer === input.recipient) throw Error('付款人與收款人必須不同。');
    if (!dateIsValid(input.date)) throw Error('請選擇有效的日期。');
    return { id: input.id, kind: 'repayment', title: '還款', date: input.date, currency: input.currency, amount: input.amount, payer: input.payer, recipient: input.recipient };
  }
  function validate(data) {
    if (!data || data.version !== 1 || !Array.isArray(data.members) || data.members.length !== 4 || !Array.isArray(data.entries) || data.entries.length > 2000) throw Error('這份備份格式不正確，或超過 2,000 筆。');
    const members = data.members.map(m => {
      if (!m || typeof m.id !== 'string' || !/^p[1-4]$/.test(m.id) || typeof m.name !== 'string' || !m.name.trim() || m.name.trim().length > 20) throw Error('旅伴資料不正確。');
      return { id: m.id, name: m.name.trim() };
    });
    if (new Set(members.map(m => m.id)).size !== 4 || new Set(members.map(m => m.name)).size !== 4) throw Error('四位旅伴的名稱需要各自不同。');
    const seen = new Set();
    const entries = data.entries.map(e => {
      if (!e || typeof e.id !== 'string' || !/^[\w-]{1,100}$/.test(e.id) || seen.has(e.id)) throw Error('有重複或不正確的支出紀錄。');
      seen.add(e.id);
      if (e.kind === 'repayment') return repayment(e, members);
      if (e.kind !== 'expense' || !e.shares || typeof e.shares !== 'object' || Array.isArray(e.shares)) throw Error('支出分攤資料不正確。');
      return expense({ ...e, participants: Object.keys(e.shares), custom: e.shares }, members);
    });
    return { version: 1, members, entries };
  }
  function balances(data, currency) {
    const result = Object.fromEntries(data.members.map(m => [m.id, 0]));
    for (const e of data.entries.filter(e => e.currency === currency)) {
      result[e.payer] += e.amount;
      if (e.kind === 'repayment') result[e.recipient] -= e.amount;
      else for (const [id, amount] of Object.entries(e.shares)) result[id] -= amount;
    }
    return result;
  }
  function settlements(data, currency) {
    const b = balances(data, currency);
    const creditors = Object.entries(b).filter(([, n]) => n > 0).sort((a, z) => z[1] - a[1]);
    const debtors = Object.entries(b).filter(([, n]) => n < 0).map(([id, n]) => [id, -n]).sort((a, z) => z[1] - a[1]);
    const transfers = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const amount = Math.min(debtors[i][1], creditors[j][1]);
      transfers.push({ payer: debtors[i][0], recipient: creditors[j][0], amount, currency });
      debtors[i][1] -= amount; creditors[j][1] -= amount;
      if (!debtors[i][1]) i++;
      if (!creditors[j][1]) j++;
    }
    return transfers;
  }
  return { currencies, money, amountText, format, empty, expense, repayment, validate, balances, settlements };
});
