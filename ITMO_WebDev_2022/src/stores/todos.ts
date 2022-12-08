import { defineStore, type StoreDefinition } from 'pinia';
import type { ITodoVO } from '@/model/vos/TodoVO';
import TodoVO from '@/model/vos/TodoVO';
import type { RouteParamValue } from 'vue-router';
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';

const LOCAL_KEY_TODOS = 'todos';

interface State {
  todos: ITodoVO[];
  selected?: ITodoVO | null;
  isLoading: boolean;
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    todos: [],
    selected: null,
    isLoading: false,
  }),
  getters: {
    hasSelectedTodo: (state) => !!state.selected,
    numberOfTodos: (state) => state.todos.length,
  },
  actions: {
    findTodoByIndex(index: number): TodoVO | null {
      return index < this.todos.length ? (this.todos[index] as TodoVO) : null;
    },
    findTodoIndex(todo: ITodoVO): number {
      return this.todos.indexOf(todo);
    },
    setupSelectedTodo(todo: ITodoVO | null): void {
      console.log('> store -> setupSelectedTodo:', { todo });
      this.selected = todo;
    },
    updateSelectedTodoTitle(text: string): void {
      console.log('> store -> updateSelectedTodoTitle:', { text });
      this.selected!.title = text;
    },
    createTodoFromText(text: string): void {
      console.log('> store -> createTodoFromText:', { text });
      this.todos.push(TodoVO.createFromTitle(text));
    },
    deleteTodo(todo: ITodoVO): void {
      console.log('> store -> deleteTodo:', { ...todo });
      this.todos.splice(this.findTodoIndex(todo), 1);
    },
    compareTextWithSelectedTodoTitle(text: string): boolean {
      const result = this.hasSelectedTodo && this.selected?.title === text;
      console.log('> store -> compareTextWithSelectedTodoTitle:', { result });
      return result;
    },
    checkTodoSelected(todo: ITodoVO): boolean {
      const result = this.hasSelectedTodo && this.selected === todo;
      console.log('> store -> checkTodoSelected:', { result });
      return result;
    },
  },
  persist: {
    storage: localStorage,
    paths: [LOCAL_KEY_TODOS],
  },
});
