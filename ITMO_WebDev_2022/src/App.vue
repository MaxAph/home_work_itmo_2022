<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { computed, Transition, KeepAlive } from 'vue';
import Routes from '@/consts/Routes.js';

const todoStore = useTodosStore();
const { numberOfTodos } = storeToRefs(todoStore);

const router = useRouter();

const isCurrentRouteIndex = () => {
  const route = useRoute();
  const result = route.path === '/';
  console.log('isCurrentRouteIndex:', result);
  return result;
};

const canRenderNumberOfTodos = computed(() => isCurrentRouteIndex());
</script>
<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div v-if="canRenderNumberOfTodos">Todos created: {{ numberOfTodos }}</div>
    <div>Current route: {{ $route.path }}</div>
    <div class="wrapper">
      <nav>
        <RouterLink :to="Routes.HOME">Todos</RouterLink>
        <RouterLink :to="Routes.COUNTER">Counter</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive exclude="TodoItemView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

header.wrapper {
  margin: 2rem 0;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
