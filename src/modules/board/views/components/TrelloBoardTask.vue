<script lang="ts" setup="">
import type {Task} from "@/types";
import DragHandle from "@/modules/board/views/components/DragHandle.vue";
defineProps<{
    task: Task
}>()
</script>

<template>
  <div class="task" :title="task.createdAt.toLocaleDateString()">
      <DragHandle />
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
.sortable-drag .task {
  transform: rotate(5deg);
}
.sortable-ghost .task {
  position: relative;
  top: 0;
  border-bottom: 0;
  left: 0;
  right: 0;
  background: #747474;
  color: #747474;
}
.sortable-ghost .task::after {
  content:"";
  position: absolute;
  top: 0;
  border-bottom: 0;
  left: 0;
  right: 0;
  background: #747474;
  color: #747474;
  border-radius: 4px;
}
</style>
