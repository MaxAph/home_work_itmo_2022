import TodoVO from './src/model/vos/TodoVO.js';
import TodoView from './src/view/ToDoView.js';
import { isStringNotNumberAndNotEmpty } from './src/model/utils/stringUtils.js';
import { disableButtonWhenTextInvalid } from './src/model/utils/domUtils.js';
import {
  localStorageListOf,
  localStorageSaveListOfWithKey,
} from './src/model/utils/dataBaseUtils.js';
import {
  delay,
  wrapDevOnlyConsoleLog,
  $,
} from './src/model/utils/generalUtils.js';
import ServerService from './src/services/serverServices.js';
import {
  LOCAL_INPUT_TEXT,
  LOCAL_LIST_OF_TODOS,
} from './src/consts/localConsts.js';
import DOM from './src/consts/dom.js';
import { data } from 'autoprefixer';

let listOfTodos = [];
let selectedTodoVO = null;
let selectedTodoViewItem = null;
const hasSelectedTodo = () => !!selectedTodoVO;

const serverService = new ServerService(
  import.meta.env.VITE_DATA_SERVER_ADDRESS
);

wrapDevOnlyConsoleLog();

serverService
  .requestTodos()
  .then((todoList) => {
    listOfTodos = todoList;
    $(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
    render_TodoListInContainer(listOfTodos, $(DOM.LIST_OF_TODOS));
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();

    $(DOM.APP).style.visibility = 'visible';
  })
  .catch((error) => {
    $(
      DOM.APP
    ).innerHTML = `<h1 style="color: maroon">Problem with server:<h1><p style="color: red"> ${error.toString()}<p>`;
  })
  .finally(() => ($(DOM.APP).style.visibility = 'visible'));

$(DOM.BTN_CREATE_TODO).addEventListener('click', onBtnCreateTodoClick);
$(DOM.INP_TODO_TITLE).addEventListener('keyup', onInpTodoTitleKeyup);
$(DOM.LIST_OF_TODOS).addEventListener('change', onTodoListChange);
$(DOM.LIST_OF_TODOS).addEventListener('click', onTodoDomItemClicked);

function onTodoDomItemClicked(event) {
  const domElement = event.target;
  console.log('> onTodoDomItemClicked -> domElement:', domElement);
  if (!TodoView.isDomElementMatch(domElement)) return;
  const currentTodoVO = listOfTodos.find((vo) => vo.id === domElement.id);

  const isItemSelected = selectedTodoVO === currentTodoVO;

  if (hasSelectedTodo) resetSelectedTodo();
  console.log('> onTodoDomItemClicked -> isItemSelected:', isItemSelected);

  if (!isItemSelected) {
    selectedTodoVO = currentTodoVO;
    selectedTodoViewItem = domElement;

    $(DOM.BTN_CREATE_TODO).innerText = 'Update';
    $(DOM.INP_TODO_TITLE).value = currentTodoVO.title;
    selectedTodoViewItem.style.backgroundColor = 'lightgray';
    onInpTodoTitleKeyup();
  }
}

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[indexInt];
    console.log('> onTodoListChange -> todoVO:', indexInt, todoVO);
    todoVO.isCompleted = !!target.checked;
    save_ListOfTodo();
  }
}

async function onBtnCreateTodoClick(event) {
  // console.log('> $(DOM.BTN_CREATE_TODO) -> handle(click)', this.attributes);
  const todoTitle_Value_FromDomInput = $(DOM.INP_TODO_TITLE).value;
  // console.log('> $(DOM.BTN_CREATE_TODO) -> todoInputTitleValue:', todoTitleValueFromDomInput);

  const isStringValid = isStringNotNumberAndNotEmpty(
    todoTitle_Value_FromDomInput
  );

  if (isStringValid) {
    const todoVO = create_TodoFromTextAndAddToList(
      todoTitle_Value_FromDomInput,
      listOfTodos
    );
    await serverService
      .saveTodo(todoVO)
      .then((data) => {
        console.log('>domBtnCreateTodo -> onBtnCreateClick: saved = ', data);
        clear_InputTextAndLocalStorage();

        render_TodoListInContainer(listOfTodos, $(DOM.LIST_OF_TODOS));
        disableOrEnable_CreateTodoButtonOnTodoInputTitle();
      })
      .catch(alert);
  }
}

function onInpTodoTitleKeyup() {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = $(DOM.INP_TODO_TITLE).value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  if (hasSelectedTodo()) {
    disableOrEnable_CreateTodoButtonOnTodoInputTitle(() => {
      return (
        isStringNotNumberAndNotEmpty(inputValue) &&
        selectedTodoVO.title !== inputValue
      );
    });
  } else {
    localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  }
}

function render_TodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function resetSelectedTodo() {
  console.log('> resetSelectedTodo -> selectedTodoVO:', selectedTodoVO);
  $(DOM.BTN_CREATE_TODO).innerText = 'Create';
  $(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoViewItem) selectedTodoViewItem.style.backgroundColor = '';
  selectedTodoVO = null;
  selectedTodoViewItem = null;
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  const newTodoVo = TodoVO.createFromTitle(input);
  listOfTodos.push(newTodoVo);
  return newTodoVo;
}

function clear_InputTextAndLocalStorage() {
  $(DOM.INP_TODO_TITLE).value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle(
  validateInputMethod = isStringNotNumberAndNotEmpty
) {
  console.log(
    '> disableOrEnableCreateTodoButtonOnTodoInputTitle -> $(DOM.INP_TODO_TITLE).value =',
    $(DOM.INP_TODO_TITLE).value
  );
  const textToValidate = $(DOM.INP_TODO_TITLE).value;
  disableButtonWhenTextInvalid(
    $(DOM.BTN_CREATE_TODO),
    textToValidate,
    validateInputMethod
  );
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}
