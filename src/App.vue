<script setup lang="ts">
</script>

<template>
    <div class="app-wrapper">
        <h1>To Do - Kanban Board</h1>
        <router-view />
    </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  padding: 2rem;
  height: 100vh;
  background-color: #1c1c1c;
  color: #d2d2d2;
  overflow: auto;
    h1 {
        margin-bottom: 1rem;
    }
}
</style>
