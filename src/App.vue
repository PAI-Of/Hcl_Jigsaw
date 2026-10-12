<template>
  <div class="app-shell">
    <AppHeader />
    <main class="main-content" id="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { applyThemeToCssVariables } from './config/index.js';

onMounted(() => {
  applyThemeToCssVariables();
});
</script>

<style>
/* Global app-level styles imported via main.js */
</style>
