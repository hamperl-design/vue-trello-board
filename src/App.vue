<script setup lang="ts">
import {useBoardStore} from "@/modules/board/infrastructure/store/board.store";

const boardStore = useBoardStore()

</script>

<template>
    <div class="app-wrapper">
        <div class="__header">
            <h1>To Do - Kanban Board</h1>
            <h2>Task: {{boardStore.numberOfTasks}}</h2>
        </div>
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
    .__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        h1 {
            margin-bottom: 1rem;
        }

    }

}
</style>
