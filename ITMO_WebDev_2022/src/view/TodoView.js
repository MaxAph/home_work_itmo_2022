class TodoView {
  static TODO_VIEW_ITEM = 'todoItem';
  static TODO_VIEW_ITEM_DELETE = 'todoDelete';

  static isDomElementMatch(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM;
  }
  static isDomElementMatchDeleteButton(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM_DELETE;
  }

  static getTodoIdFromDeleteButton(domDeleteButton) {
    return domDeleteButton.parentNode.id;
  }

  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isComplited ? 'checked' : '';
    return `<li class = "todo-item" style="user-select: none; width: 100%;position: relative; margin: 4px" data-type="${TodoView.TODO_VIEW_ITEM}" id="${vo.id}">
        <input type="checkbox" id="${index}"${checked}>${vo.title}
        <button data-type = "${TodoView.TODO_VIEW_ITEM_DELETE}"
         class ='delete-button' style='position: absolute;
         right: 0; top:0; color: darkblue'>Delete</button>
    </li>`;
  }
}

export default TodoView;
