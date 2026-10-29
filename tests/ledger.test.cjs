const test = require('node:test');
const assert = require('node:assert/strict');
const L = require('../ledger-core.js');
const members = L.empty().members;
const ids = members.map(m => m.id);
const expense = (changes = {}) => L.expense({
  id: 'dinner', title: '晚餐', date: '2026-12-24', currency: 'JPY',
  amount: 1001, payer: 'p1', participants: ids, ...changes
}, members);
const book = entries => L.validate({ ...L.empty(), entries });

test('decimal input is converted to exact integer minor units without truncation', () => {
  assert.equal(L.money('12.34', 'TWD'), 1234);
  assert.equal(L.money('0.01', 'TWD'), 1);
  assert.equal(L.money('12.3', 'TWD'), 1230);
  assert.equal(L.money('1001', 'JPY'), 1001);
  assert.equal(L.amountText(1234, 'TWD'), '12.34');
  for (const [text, c] of [['1.2', 'JPY'], ['1.001', 'TWD'], ['-1', 'JPY'], ['1e3', 'JPY'], ['', 'TWD'], ['1,000', 'JPY'], ['2', 'USD']]) {
    assert.throws(() => L.money(text, c));
  }
});

test('equal shares preserve every yen or cent for one to four participants', () => {
  for (const currency of ['JPY', 'TWD']) {
    for (let count = 1; count <= 4; count++) {
      for (let amount = 1; amount <= 109; amount++) {
        const shares = Object.values(expense({ amount, currency, participants: ids.slice(0, count) }).shares);
        assert.equal(shares.reduce((a, b) => a + b), amount);
        assert.ok(Math.max(...shares) - Math.min(...shares) <= 1);
      }
    }
  }
  assert.deepEqual(expense().shares, { p1: 251, p2: 250, p3: 250, p4: 250 });
});

test('payer may cover people who participated without sharing the bill', () => {
  const b = book([expense({ participants: ['p3', 'p4'], amount: 500 })]);
  assert.deepEqual(L.balances(b, 'JPY'), { p1: 500, p2: 0, p3: -250, p4: -250 });
});

test('manual shares accept unequal and zero amounts but require the exact total', () => {
  assert.deepEqual(expense({ amount: 1000, participants: ['p1', 'p2'], custom: { p1: 0, p2: 1000 } }).shares, { p1: 0, p2: 1000 });
  assert.throws(() => expense({ custom: { p1: 250, p2: 250, p3: 250, p4: 250 } }));
  assert.throws(() => expense({ custom: { p1: -1, p2: 502, p3: 250, p4: 250 } }));
  assert.throws(() => expense({ custom: { p1: 1 } }));
});

test('different currencies never cancel or mix balances', () => {
  const b = book([expense(), expense({ id: 'twd', currency: 'TWD', payer: 'p2', amount: 800000 })]);
  assert.deepEqual(L.balances(b, 'JPY'), { p1: 750, p2: -250, p3: -250, p4: -250 });
  assert.deepEqual(L.balances(b, 'TWD'), { p1: -200000, p2: 600000, p3: -200000, p4: -200000 });
});

test('repaying the suggested transfers clears all four balances exactly', () => {
  const entries = [expense({ amount: 12000 }), expense({ id: 'taxi', amount: 2400, payer: 'p2', participants: ['p1', 'p2'] }), expense({ id: 'ski', amount: 11000, payer: 'p3', participants: ['p3', 'p4'] })];
  const b = book(entries);
  assert.deepEqual(L.balances(b, 'JPY'), { p1: 7800, p2: -1800, p3: 2500, p4: -8500 });
  const transfers = L.settlements(b, 'JPY');
  assert.ok(transfers.length <= 3);
  const repaid = transfers.map((t, i) => L.repayment({ ...t, id: `paid-${i}`, date: '2026-12-27' }, members));
  const cleared = book([...entries, ...repaid]);
  assert.deepEqual(L.balances(cleared, 'JPY'), { p1: 0, p2: 0, p3: 0, p4: 0 });
  assert.deepEqual(L.settlements(cleared, 'JPY'), []);
});

test('partial repayment reduces debt and editing or removing it recomputes balances', () => {
  const e = expense({ amount: 1200 });
  const r = L.repayment({ id: 'repay', currency: 'JPY', amount: 100, date: '2026-12-24', payer: 'p2', recipient: 'p1' }, members);
  assert.deepEqual(L.balances(book([e, r]), 'JPY'), { p1: 800, p2: -200, p3: -300, p4: -300 });
  assert.equal(L.balances(book([e, { ...r, amount: 300 }]), 'JPY').p2, 0);
  assert.equal(L.balances(book([e]), 'JPY').p2, -300);
});

test('unsupported currencies, invalid participants, dates and amounts cannot enter the book', () => {
  for (const changes of [{ currency: 'toString' }, { currency: 'USD' }, { currency: ['JPY'] }, { amount: 0 }, { amount: -2 }, { amount: 1.2 }, { amount: Number.MAX_SAFE_INTEGER }, { participants: [] }, { participants: ['p9'] }, { payer: 'p9' }, { date: '2026-02-30' }, { title: 1 }]) {
    assert.throws(() => expense(changes));
  }
  assert.throws(() => L.repayment({ currency: 'JPY', amount: 100, date: '2026-12-24', payer: 'p1', recipient: 'p1' }, members));
});

test('backup rejects duplicate entries, unknown shares, fractional minor units and duplicate people', () => {
  const e = expense();
  assert.throws(() => book([e, e]));
  assert.throws(() => book([{ ...e, shares: { ...e.shares, p9: 0 } }]));
  assert.throws(() => book([{ ...e, shares: { p1: 251.5, p2: 249.5, p3: 250, p4: 250 } }]));
  assert.throws(() => L.validate({ ...L.empty(), members: members.map(m => ({ ...m, name: '重複' })) }));
  assert.throws(() => L.validate({ ...L.empty(), members: members.map(m => ({ ...m, id: [m.id] })) }));
  assert.throws(() => L.validate({ ...L.empty(), entries: Array(2001).fill(e) }));
});

test('backup round trip retains exact custom allocations and repayment details', () => {
  const e = expense({ amount: 345, currency: 'TWD', participants: ['p1', 'p4'], custom: { p1: 123, p4: 222 } });
  const r = L.repayment({ id: 'received', amount: 100, currency: 'TWD', date: '2027-01-01', payer: 'p4', recipient: 'p1' }, members);
  const original = book([e, r]);
  assert.deepEqual(L.validate(JSON.parse(JSON.stringify(original))), original);
});

test('import keeps the original remainder even if share properties were reordered', () => {
  const imported = book([{ id: 'reordered', kind: 'expense', title: '零頭', date: '2026-12-24', currency: 'TWD', amount: 1, payer: 'p1', shares: { p4: 1, p3: 0 } }]);
  assert.deepEqual(imported.entries[0].shares, { p4: 1, p3: 0 });
  const currentOrder = imported.members.filter(m => Object.hasOwn(imported.entries[0].shares, m.id)).map(m => m.id);
  const equal = expense({ amount: 1, currency: 'TWD', participants: currentOrder }).shares;
  assert.notDeepEqual(equal, imported.entries[0].shares);
});

test('settlement remains balanced across mixed bills and arbitrary participant groups', () => {
  for (let round = 1; round <= 80; round++) {
    const entries = Array.from({ length: 12 }, (_, i) => expense({
      id: `bill-${i}`, amount: (round * 37 + i * 131) % 10007 + 1,
      payer: ids[(round + i) % 4], participants: ids.filter((id, p) => (i + p + round) % 3 !== 0)
    }));
    const b = book(entries);
    assert.equal(Object.values(L.balances(b, 'JPY')).reduce((a, n) => a + n), 0);
    const paid = L.settlements(b, 'JPY').map((t, i) => L.repayment({ ...t, id: `r-${i}`, date: '2026-12-28' }, members));
    assert.deepEqual(L.balances(book([...entries, ...paid]), 'JPY'), { p1: 0, p2: 0, p3: 0, p4: 0 });
  }
});
