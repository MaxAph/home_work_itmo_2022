const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItemTotal = document.getElementById('workItemTotalContainer');

domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('keyup', totalItem);
domInputCost.addEventListener('keyup', totalItem);

function totalItem() {
  const qty = domInputQty.value;
  const cost = domInputCost.value;
  let total = qty * cost;
  domItemTotal.innerHTML = total;
  console.log(total);
  return total;
}

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
}

function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}
