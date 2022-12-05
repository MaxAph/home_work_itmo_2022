const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
const domWorkItem = document.getElementById('inputWorkItemTitle');
const domDescription = document.getElementById('inputWorkItemDescription');
const domBtnCreate = document.getElementById('btnCreateWorkItem');

// popup total and save  to localStorage;
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);
domBtnCreate.addEventListener('click', addItemPopup);

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
}
function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}

function totalItemAndSaveLocalStorage() {
  const qty = domInputQty.value;
  // console.log(typeof domInputQty.value, domInputQty.value);
  localStorage.setItem('domInputQty', domInputQty.value);
  const cost = domInputCost.value;
  // console.log(typeof domInputCost.value, domInputCost.value);
  localStorage.setItem('domInputCost', domInputCost.value);
  localStorage.setItem('domWorkItem', domWorkItem.value);
  localStorage.setItem('domDescription', domDescription.value);
  if (!isNaN(qty || cost)) {
    let total = qty * cost;
    domItem.innerHTML = total;
    console.log(total);
    localStorage.setItem('domItemTotal', total);
  } else {
    alert('Нужно писать число!');
  }
}

// let val = document.getElementById('inputWorkItemQty').value;
// localStorage.setItem('inputWorkItemQty', val);
// console.log('LOG', domInputQty);

// class todoItem {
//   constructor(qty, cost, total, workItem, description) {
//     this.qty = qty;
//     this.cost = cost;
//     this.total = total;
//     this.workItem = workItem;
//     this.description = description;
//   }
// }
// const item1 = new todoItem(
//   localStorage.getItem('domInputQty'),
//   localStorage.getItem('domInputCost'),
//   localStorage.getItem('domWorkItem'),
//   localStorage.getItem('domItemTotal'),
//   localStorage.getItem('domDescription')
// );

// console.log(item1);

////////////
function addItemPopup() {
  const addItem = document.getElementById('tableWorkItems');
  const simpleCopy = addItem.cloneNode(true);
  document.getElementById('tableWorkItems').append(simpleCopy);
  console.log(simpleCopy);
  simpleCopy.querySelector('.title').innerHTML =
    localStorage.getItem('domWorkItem');
  simpleCopy.querySelector('.description').innerHTML =
    localStorage.getItem('domDescription');
  simpleCopy.querySelector('.Qty').innerHTML =
    localStorage.getItem('domInputQty');
  simpleCopy.querySelector('.Cost').innerHTML =
    localStorage.getItem('domInputCost');
  simpleCopy.querySelector('.total').innerHTML =
    localStorage.getItem('domItemTotal');
  domBtnClose.click();
}

function discountAndTaxes() {
  let result = localStotage.getItem('SubtotalEnd');
  let discountResult = result;
  discount.innerHTML = discountResult;
  const discount = Number(domDiscountInput.value);
  const taxes = domTaxesInput.value;
  if (discount > 0 && taxes <= 0) {
    let percentDis = Math.floor((result / 100) * discount);
    discountResult = result - percentDis;
    domDiscount.innetHTML = discountResult;
    domResults.innerHTML = discountResult;
  } else if (discount > 0 && taxes > 0) {
    let percentDis = Math.floor((result / 100) * discount);
    discountResult = result - percentDis;
    domDiscount.innetHTML = discountResult;
    let percentTax = Math.ceil((discountResult / 100) * taxes);
    domTaxes.innerHTML = percentTax;
    domResults.innerHTML = discountResult + percentTax;
  } else if (discount <= 0 && taxes > 0) {
    let percentTax = Math.ceil((result / 100) * taxes);
    domTaxes.innerHTML = percentTax;
    domResults.innerHTML = Number(result) + Number(percentTax);
  }
}
