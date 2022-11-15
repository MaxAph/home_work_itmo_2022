var C = Object.defineProperty;
var N = (t, e, o) =>
  e in t
    ? C(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (t[e] = o);
var y = (t, e, o) => (N(t, typeof e != 'symbol' ? e + '' : e, o), o);
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const l of n)
      if (l.type === 'childList')
        for (const p of l.addedNodes)
          p.tagName === 'LINK' && p.rel === 'modulepreload' && i(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(n) {
    const l = {};
    return (
      n.integrity && (l.integrity = n.integrity),
      n.referrerpolicy && (l.referrerPolicy = n.referrerpolicy),
      n.crossorigin === 'use-credentials'
        ? (l.credentials = 'include')
        : n.crossorigin === 'anonymous'
        ? (l.credentials = 'omit')
        : (l.credentials = 'same-origin'),
      l
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const l = o(n);
    fetch(n.href, l);
  }
})();
class I {
  static createFromTitle(e) {
    const o = Date.now().toString();
    return new I(o, e);
  }
  constructor(e, o, i = new Date()) {
    (this.id = e), (this.title = o), (this.data = i), (this.isComplited = !1);
  }
}
function v(t, e, o, { textWhenDisabled: i, textWhenEnabled: n } = {}) {
  if (!o) throw new Error('Validate method must be defined');
  o(e)
    ? ((t.disabled = !1), n && (t.textContent = n))
    : ((t.disabled = !0), i && (t.textContent = i));
}
function O(t) {
  if (t === null) throw new Error('Null value is not allowed');
  if (t === void 0) throw new Error('Undefined value is not allowed');
  const e = typeof t == 'string',
    o = isNaN(parseInt(t)),
    i = e && o && t.length > 0;
  return (
    console.log('> isStringNotNumberAndNotEmpty -> result', {
      result: i,
      isInputValueString: e,
      isInputValueNotNumber: o,
    }),
    i
  );
}
function _(t, e = []) {
  const o = localStorage.getItem(t);
  if ((console.log('> localStorageListOf: value =', o), o === null)) return [];
  const i = JSON.parse(o);
  return Array.isArray(i) ? i : e;
}
function b(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
const f = class {
  static isDomElementMatch(e) {
    return e.dataset.type === f.TODO_VIEW_ITEM;
  }
  static createSimpleViewFromVO(e, o) {
    const i = o.isComplited ? 'checked' : '';
    return `<li style="user-select: none; width: 100%;
" data-type="${f.TODO_VIEW_ITEM}" id="${o.id}">
        <input type="checkbox" id="${e}"${i}>${o.title}
    </li>`;
  }
};
let c = f;
y(c, 'TODO_VIEW_ITEM', 'todoItem');
const r = document.getElementById('inpTodoTitle'),
  m = document.getElementById('btnCreateTodo'),
  T = document.getElementById('listOfTodos');
let d = null,
  a = null;
const h = () => !!d;
m.addEventListener('click', k);
r.addEventListener('keyup', L);
T.addEventListener('change', A);
T.addEventListener('click', w);
const S = 'listOfTodos',
  g = 'inputText',
  s = _(S);
console.log('> Initial value -> listOfTodos', s);
r.value = localStorage.getItem(g);
E(s, T);
u();
function w(t) {
  const e = t.target;
  if (
    (console.log('> onTodoDomItemClicked -> domElement:', e),
    !c.isDomElementMatch(e))
  )
    return;
  const o = s.find((n) => n.id === e.id),
    i = d === o;
  h && x(),
    console.log('> onTodoDomItemClicked -> isItemSelected:', i),
    i ||
      ((d = o),
      (a = e),
      (m.innerText = 'Update'),
      (r.value = o.title),
      (a.style.backgroundColor = 'lightgray'),
      L());
}
function A(t) {
  console.log('> onTodoListChange -> event:', t);
  const e = t.target,
    o = e.id;
  if (o && typeof o == 'string') {
    const i = parseInt(o.trim()),
      n = s[i];
    console.log('> onTodoListChange -> todoVO:', i, n),
      (n.isCompleted = !!e.checked),
      V();
  }
}
function k(t) {
  const e = r.value;
  O(e) && (D(e, s), B(), V(), E(s, T), u());
}
function L() {
  const t = r.value;
  h() ? u(() => O(t) && d.title !== t) : (localStorage.setItem(g, t), u());
}
function E(t, e) {
  let o = '',
    i;
  for (let n in t) (i = t[n]), (o += c.createSimpleViewFromVO(n, i));
  e.innerHTML = o;
}
function x() {
  console.log('> resetSelectedTodo -> selectedTodoVO:', d),
    (m.innerText = 'Create'),
    (r.value = localStorage.getItem(g)),
    a && (a.style.backgroundColor = ''),
    (d = null),
    (a = null),
    u();
}
function D(t, e) {
  console.log('> create_TodoFromTextAndAddToList -> input =', t),
    e.push(I.createFromTitle(t));
}
function B() {
  (r.value = ''), localStorage.removeItem(g);
}
function u(t = O) {
  console.log(
    '> disableOrEnableCreateTodoButtonOnTodoInputTitle -> domInpTodoTitle.value =',
    r.value
  );
  const e = r.value;
  v(m, e, t);
}
function V() {
  b(S, s);
}
