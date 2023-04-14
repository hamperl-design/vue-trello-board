<script lang="ts" setup="">
import {ref} from "vue";
import type {Column, Task} from "@/types";
import {nanoid} from "nanoid";
import TrelloBoardTask from "@/modules/board/views/components/TrelloBoardTask.vue";
import draggable from "vuedraggable";
import DragHandle from "@/modules/board/views/components/DragHandle.vue";
import {useKeyModifier} from "@vueuse/core";

const columns = ref<Column[]>([
    {
        id: nanoid(),
        title: 'Backlog',
        tasks: [
            {
               id: nanoid(),
               title: 'First task',
               createdAt: new Date()
            },
            {
                id: nanoid(),
                title: 'Second task',
                createdAt: new Date()
            },
            {
                id: nanoid(),
                title: 'Third task',
                createdAt: new Date()
            }
        ]
    },
    {id: nanoid(), title: 'ToDo', tasks: []},
    {id: nanoid(), title: 'In Progress', tasks: []},
    {id: nanoid(), title: 'Done', tasks: []},
    {id: nanoid(), title: 'Deployed', tasks: []},
])
const alt = useKeyModifier('Control')
</script>

<template>
      <draggable
        v-model="columns"
        group="columns"
        item-key="id"
        class="board"
        :animation="250"
        handle=".drag-handle"
      >
          <template #item="{element: column}: {element: Column}">
              <div class="__column">
                  <header class="__header">
                      <DragHandle />
                      {{ column.title }}
                  </header>
                  <draggable
                      v-model="column.tasks"
                      :group="{name: 'task', pull: alt ? 'clone' : true}"
                      item-key="id"
                      :animation="250"
                      handle=".drag-handle"
                  >
                      <template #item="{element: task}: {element: Task}">
                          <div>
                          <TrelloBoardTask
                              :task="task"
                          />
                          </div>
                      </template>
                  </draggable>
                  <footer>
                      <button class="__add-button">+ Add a Card</button>
                  </footer>
              </div>
          </template>
      </draggable>
</template>

<style lang='scss'>

.board {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1rem;
  overflow-x: auto;
  .__column {
    background-color: #3f3f3f;
    padding: 1rem;
    border-radius: 4px;
    min-width: 250px;
      &:hover {
          background-color: #646464;
      }
    .__header {
      font-weight: bold;
      margin-bottom: 12px;
    }
    .__add-button {
      color: #aaaaaa;
      border: none;
      background-color: transparent;
      &:hover {
        color: #4d31b0;
      }
    }
  }
}
</style>
