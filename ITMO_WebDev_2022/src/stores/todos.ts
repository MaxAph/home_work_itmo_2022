import { defineStore } from 'pinia';
import type { ITodoVO } from '@/model/vos/TodoVO';

const LOCAL_KEY_TODOS = 'todos';
const LOCAL_KEY_TEXT = 'text';

interface State {
  todos: ITodoVO[];
  selected?: ITodoVO | null;
  isLoading: boolean;
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    todos: JSON.parse(localStorage.getItem(LOCAL_KEY_TODOS) as string) || [],
    selected: null,
    isLoading: false,
  }),
  getters: {
    isSelectedActive(state): boolean {
      return !!state.selected;
    },
    isTodoNotSelected(): boolean {
      return !this.isSelectedActive;
    },
  },

  actions: {
    checkTodoSelected(todo: ITodoVO) {
      const result = this.selected === todo;
      return result;
    },
    selectTodo(todo: ITodoVO) {
      this.selected = todo;
    },
    deselectTodo(todo: ITodoVO) {
      this.selected = null;
    },
  },
});
