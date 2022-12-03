<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';
import type ITodoVO from '@/model/vos/TodoVO';
import TodoVO from '@/model/vos/TodoVO';
import useVuelidate from '@vuelidate/core';
import { alpha, helpers, minLength, required } from '@vuelidate/validators';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useTodosStore } from './stores/todos';

const LOCAL_KEY_TODOS = 'todos';
const LOCAL_KEY_TEXT = 'text';

const getLocalText = () => localStorage.getItem(LOCAL_KEY_TEXT) || '';
const getTodoIndex = (todo: ITodoVO): number => store.todos.indexOf(todo);

const updateSelectedTodoTitle = (title: string) =>
  ((store.selected! as TodoVO).title = title);
const createTodoFromTitle = (title: string) =>
  store.todos.push(TodoVO.createFromTitle(title));

const domBtnAction = ref(null);
const titleText = ref(getLocalText());
const store = useTodosStore();

const cyrilicValidator = helpers.regex(/^[А-Яа-яёЁ]+$/i);
const validator = useVuelidate(
  {
    titleText: { required, minLength: minLength(3), alpha },
  },
  { titleText }
);

const validate = () => validator.value.$validate();

const isActionButtonDisabled = computed(() => {
  return (
    validator.value.titleText.$error ||
    (store.isSelectedActive && titleText.value === store.selected?.title)
  );
});

const onTodoListItemClicked = (todo: ITodoVO) => {
  console.log('> onTodoListItemClicked', todo);
  const isSelected = store.checkTodoSelected(todo);

  isSelected ? store.selectTodo(todo) : store.deselectTodo(todo);

  titleText.value = isSelected ? getLocalText() : todo.title;
  (domBtnAction.value! as HTMLElement).innerText = isSelected
    ? 'Create'
    : 'Update';
};
const onDeleteTodo = (todo: ITodoVO) => {
  console.log('> onTodoListItemClicked', todo);
  if (store.checkTodoSelected(todo)) onTodoListItemClicked(todo);
  store.todos.splice(getTodoIndex(todo), 1);
};
const onCreateButtonClick = () => {
  console.log('> onCreateButtonClick', store);
  if (store.isSelectedActive) {
    updateSelectedTodoTitle(titleText.value);
    onTodoListItemClicked(store.selected!);
  } else {
    createTodoFromTitle(titleText.value);
    titleText.value = '';
  }
  validate();
};
const onInputKeyEnter = () => {
  !isActionButtonDisabled && onCreateButtonClick();
};

watch(store.todos, (value) =>
  localStorage.setItem(LOCAL_KEY_TODOS, JSON.stringify(value))
);
watch(
  titleText,
  (value) =>
    store.isTodoNotSelected && localStorage.setItem(LOCAL_KEY_TEXT, value)
);
onMounted(
  () => (
    validate(),
    setTimeout(() => {
      store.isLoading = false;
    }, 1000)
  )
);
</script>
<template>
  <Spinner v-if="store.isLoading" />
  <main v-else>
    <input
      v-model="titleText"
      @keyup.enter="onInputKeyEnter"
      @keyup="validate"
    />
    <button
      ref="domBtnAction"
      @click="onCreateButtonClick"
      :disabled="isActionButtonDisabled"
    >
      Create
    </button>
    <ol>
      <li
        v-for="todo in store.todos"
        @click.self="onTodoListItemClicked(todo)"
        :class="{ selected: store.selected === todo }"
        :key="todo.id"
      >
        {{ todo.title }}
        <button
          style="
            font-size: larger;
            font-weight: 600;
            border-radius: 30%;
            color: brown;
          "
          @click="onDeleteTodo(todo)"
          class="delete"
        >
          Delete
        </button>
      </li>
    </ol>
  </main>
</template>
<style lang="scss" scoped>
.selected {
  background-color: #f1f1f1;
  outline: 1px solid #ccc;
}
.delete {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  zoom: 0.5;
}

li {
  padding: 0.25rem;
  margin: 0.25rem 0;
  user-select: none;
  position: relative;
  box-sizing: border-box;

  &:hover {
    background-color: #fcfcfc;
    & > button {
      &.delete {
        display: block;
      }
    }
  }
}
</style>
