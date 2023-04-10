<script lang="ts" setup="">
import type {Task} from "@/types";
defineProps<{
    task: Task
}>()
</script>

<template>
  <div class="task" :title="task.createdAt.toLocaleDateString()">
      <span>{{task.title}}</span>
  </div>
</template>

<style lang='scss'>
.task {
  color: #ffffff;
  background-color: #858585;
  padding: 4px 12px;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 2px #00000044;
  max-width: 250px;
}
</style>