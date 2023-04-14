<script lang="ts" setup="">
import type {Task, ID} from "@/types";
import DragHandle from "@/modules/board/views/components/DragHandle.vue";
import {ref} from "vue";
import {onKeyStroke} from "@vueuse/core";
const props = defineProps<{
    task: Task
}>()
const emit = defineEmits<{
    (e: 'delete', payload: ID): void
}>()

const focused = ref<boolean>(false)
onKeyStroke("Backspace", (e: Event) => {
    if (focused.value) emit('delete',  props.task.id)
})
</script>

<template>
  <div class="task" :title="new Date(task.createdAt).toLocaleDateString()" @focus="focused = true"
       @blur="focused = false" tabindex="0">
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
  //box-shadow: 0 0 2px #00000044;
  max-width: 250px;
  display: flex;
  &:focus,
  &:focus-visible {
    outline: #4d31b0 auto 1px;
  }
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
