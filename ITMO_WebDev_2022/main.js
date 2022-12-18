const domTitleWorkItem = document.getElementById('titleWorkItemContainer');
const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const domBtnDelete = document.getElementById('btnDeleteWorkItemPopup');
const popup = document.getElementById('popup');
const domInpInvoiceNumber = document.getElementById('inputInvoiceNumber');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
const domWorkItem = document.getElementById('inputWorkItemTitle');
const domDescription = document.getElementById('inputWorkItemDescription');
const domBtnCreate = document.getElementById('btnCreateWorkItem');
const domSubtotal = document.getElementById('resultsSubtotalContainer');
const domDiscount = document.getElementById('resultsDiscountContainer');
const domDiscountInput = document.getElementById('inputDiscountPercent');
const domTaxes = document.getElementById('resultsTaxesContainer');
const domTaxesInput = document.getElementById('inputTaxPercent');
const domResults = document.getElementById('resultsTotalContainer');
const domInputIBAN = document.getElementById('inputIBANNumber');
let containerForWorkItems = document.getElementById('tableWorkItems');
const workItemTemplateSimpleCopy =
  containerForWorkItems.querySelector('#templateWorkItem');

popup.addEventListener('keyup', validateQtyCostDescription);
domInpInvoiceNumber.addEventListener(
  'input',
  InputOnlyNumber,
  saveInvoiceNumberAndIBANInLocalStorage
);
domInputIBAN.addEventListener('input', saveInvoiceNumberAndIBANInLocalStorage);
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener(
  'input',
  InputOnlyNumber,
  totalItemAndSaveLocalStorage
);
domInputCost.addEventListener(
  'input',
  InputOnlyNumber,
  totalItemAndSaveLocalStorage
);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);

domDiscountInput.addEventListener('input', InputOnlyNumber, discountAndTaxes);
domTaxesInput.addEventListener('input', InputOnlyNumber, discountAndTaxes);
containerForWorkItems.addEventListener('click', openAndChangeWorkItem);

domInpInvoiceNumber.oninput = (event) => InputLimit(4, event.currentTarget);
domDiscountInput.oninput = (event) => InputLimit(2, event.currentTarget);
domTaxesInput.oninput = (event) => InputLimit(2, event.currentTarget);

function InputOnlyNumber(e) {
  this.value = this.value.replace(/[^\d.]/g, '');
}

function InputLimit(num, input) {
  if (input.value.length > num) {
    input.value = input.value.slice(0, num);
    console.log('InputLimit', input.value);
  }
}

function saveInvoiceNumberAndIBANInLocalStorage() {
  localStorage.setItem('domInvoiceNumber', domInpInvoiceNumber.value);
  localStorage.setItem('domIBAN', domInputIBAN.value);
}

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
  domInputQty.value = '';
  domInputCost.value = '';
  domWorkItem.value = '';
  domDescription.value = '';
  domTitleWorkItem.innerHTML = 'Add';
  domBtnCreate.innerHTML = 'Create';
  domBtnDelete.disabled = true;
  domBtnCreate.addEventListener('click', addWorkItem);
}

function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}

function totalItemAndSaveLocalStorage() {
  const qty = domInputQty.value;
  localStorage.setItem('domInputQty', domInputQty.value);
  const cost = domInputCost.value;
  localStorage.setItem('domInputCost', domInputCost.value);
  localStorage.setItem('domWorkItem', domWorkItem.value);
  localStorage.setItem('domDescription', domDescription.value);
  localStorage.setItem('domDescription', domDescription.value);
  let total = qty * cost;
  domItem.innerHTML = total;
  localStorage.setItem('domItemTotal', total);
}

function subtotal() {
  let subtotal = domSubtotal.innerHTML;
  localStorage.setItem('Subtotal', subtotal);
  const subBefore = localStorage.getItem('Subtotal');
  let total = localStorage.getItem('domItemTotal');
  const subAfter = Number(subBefore) + Number(total);

  domSubtotal.innerHTML = subAfter;
  localStorage.setItem('SubtotalEnd', subAfter);
}
function subtotalMinus() {
  let befofeSubtot = localStorage.getItem('SubtotalEnd');
  let minusSubtot = localStorage.getItem('domItemTotalMinus');
  let afterSubtot = Number(befofeSubtot) - Number(minusSubtot);
  console.log('befofeSubtot', befofeSubtot);
  console.log('afterSubtot', afterSubtot);
  console.log('minusSubtot', minusSubtot);
  localStorage.setItem('SubtotalEnd', afterSubtot);
  domSubtotal.innerHTML = Number(afterSubtot);
}

function discountAndTaxes() {
  let result = localStorage.getItem('SubtotalEnd');
  let discountResult = result;
  domDiscount.innerHTML = discountResult;
  const discount = Number(domDiscountInput.value);
  console.log(typeof discount, discount);

  if (discount > 0) {
    let percentDis = Math.floor((result / 100) * discount);
    discountResult = result - percentDis;
    domDiscount.innerHTML = discountResult;
    domResults.innerHTML = discountResult;
  } else {
    domDiscount.innerHTML = 0;
    domResults.innerHTML = discountResult;
  }
  const taxes = domTaxesInput.value;
  let percentTax = Math.floor((discountResult / 100) * taxes);
  domTaxes.innerHTML = Math.ceil(percentTax);
  domResults.innerHTML = Number(discountResult) + Number(percentTax);
}

function addWorkItem() {
  const simpleCopy = workItemTemplateSimpleCopy.cloneNode(true);
  document.getElementById('tableWorkItems').append(simpleCopy);
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
  simpleCopy.style.display = '';
  subtotal();
  domBtnClose.click();
  discountAndTaxes();
  domBtnCreate.removeEventListener('click', addWorkItem);
  saveWorkItemInLocalStorage();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('textarea, input').forEach(function (e) {
    if (e.value === '')
      e.value = window.sessionStorage.getItem(e.name, e.value);

    e.addEventListener('input', function () {
      window.sessionStorage.setItem(e.name, e.value);
    });
  });
});
function validateQtyCostDescription() {
  if (
    domInputQty.value !== '' &&
    domInputCost.value !== '' &&
    domWorkItem.value !== ''
  ) {
    domBtnCreate.disabled = false;
  } else {
    domBtnCreate.disabled = true;
  }
}

function openAndChangeWorkItem(e) {
  domBtnCreate.removeEventListener('click', addWorkItem);
  const selectedItem = e.target;
  let domCost = selectedItem.querySelector('.Cost');
  let domQty = selectedItem.querySelector('.Qty');
  let domTitle = selectedItem.querySelector('.title');
  let domDes = selectedItem.querySelector('.description');
  let domTotal = selectedItem.querySelector('.Total');

  domItem.value = domTotal.innerHTML;
  domInputCost.value = domCost.innerHTML;
  domInputQty.value = domQty.innerHTML;
  domWorkItem.value = domTitle.innerHTML;
  domDescription.value = domDes.innerHTML;
  localStorage.setItem('domItemTotalMinus', domItem.value);
  popup.style.display = 'block';
  domTitleWorkItem.innerHTML = 'Update';
  domBtnCreate.innerHTML = 'Save';
  domBtnDelete.disabled = false;
  domBtnDelete.onclick = () => {
    const result = confirm(
      'Are you sure you want to delete: ' + domWorkItem.value + ' ?'
    );
    if (result) {
      let subtotalBef = domSubtotal.innerHTML;
      let subtotal = Number(subtotalBef) - Number(domItem.value);
      domSubtotal.innerHTML = subtotal;
      localStorage.setItem('SubtotalEnd', subtotal);
      domResults.innerHTML = subtotal;
      discountAndTaxes();
      selectedItem.remove();
      domBtnClose.click();
    }
  };
  if (
    domWorkItem.value === domTitle.innerHTML &&
    domInputQty.value === domQty.innerHTML &&
    domInputCost.value === domCost.innerHTML
  ) {
    domBtnCreate.disabled = true;
  } else {
    domBtnCreate.disabled = false;
  }
  console.log('domCost.innerHTML', domCost.innerHTML);
  console.log('domInputCost.value', domInputCost.value);
  console.log('domCost.value', domCost.value);
  console.log('domInputCost.innerHTML', domInputCost.innerHTML);

  totalItemAndSaveLocalStorage();
  domBtnCreate.addEventListener('click', SaveWorkItem);
  function SaveWorkItem() {
    domTotal.innerHTML = localStorage.getItem('domItemTotal');
    domCost.innerHTML = localStorage.getItem('domInputCost');
    domQty.innerHTML = localStorage.getItem('domInputQty');
    domTitle.innerHTML = localStorage.getItem('domWorkItem');
    domDes.innerHTML = localStorage.getItem('domDescription');
    console.log('domCost.innerHTML', domCost.innerHTML);
    console.log('domInputCost.value', domInputCost.value);
    saveWorkItemInLocalStorage();
    domBtnClose.click();
    subtotal();
    subtotalMinus();
    discountAndTaxes();
    domBtnCreate.removeEventListener('click', SaveWorkItem);
  }
}

document.addEventListener('DOMContentLoaded', openWorkItemAfterReload);
function saveWorkItemInLocalStorage() {
  localStorage.setItem(
    'containerForWorkItems',
    JSON.stringify(containerForWorkItems)
  );
}
function openWorkItemAfterReload() {
  let container = JSON.parse(localStorage.getItem('containerForWorkItems'));
  console.log('type container', typeof container);
  console.log('container', container);
  let containerForWorkItems = document.getElementById('tableWorkItems');
  console.log(
    'containerForWorkItemsLength',
    containerForWorkItems.childNodes.length
  );
  console.log('containerLength', container.childNodes.length);
  if (container.childNodes.length > 3) {
    containerForWorkItems.innerHTML = container;
  }
}
