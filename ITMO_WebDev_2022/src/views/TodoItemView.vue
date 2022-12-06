<script setup>
import { useRoute } from 'vue-router';
import { useTodosStore } from '@/stores/todos';
const todoStore = useTodosStore();
const { findTodoByIndex } = todoStore;

const currentTodoTitle = findTodoByIndex(useRoute().params.id)?.title;
</script>
<template>
  <div>
    <h1>This is an todo id page</h1>
    <div>Title{{ currentTodoTitle || 'NOT FOUND' }}</div>
  </div>
</template>
<style></style>
