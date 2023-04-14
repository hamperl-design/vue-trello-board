<script lang="ts" setup="">
import {nextTick} from "vue";
import type {Column, Task} from "@/types";
import {nanoid} from "nanoid";
import TrelloBoardTask from "@/modules/board/views/components/TrelloBoardTask.vue";
import draggable from "vuedraggable";
import DragHandle from "@/modules/board/views/components/DragHandle.vue";
import {useKeyModifier, useLocalStorage} from "@vueuse/core";
import NewTask from "@/modules/board/views/components/NewTask.vue";

const columns = useLocalStorage<Column[]>('trelloBoard', [
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
const createColumn = () => {
    const column: Column = {
        id: nanoid(),
        title: '',
        tasks: []
    }

    columns.value.push(column)
    nextTick(() => {
        (document.querySelector('.__column:last-of-type .title-input') as HTMLInputElement).focus()
    })
}
</script>

<template>
    <div class="board-wrapper">
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
                      <input
                          class="__column-input title-input"
                          @keyup.enter="($event.target as HTMLInputElement).blur()"
                          @keydown.backspace="column.title === '' ? (columns = columns.filter(c => c.id !== column.id)) : null"
                          type="text"
                          v-model="column.title"
                      />
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
                              @delete="column.tasks = column.tasks.filter(t => t.id !== $event)"
                          />
                          </div>
                      </template>
                  </draggable>
                  <footer>
                      <NewTask @add="column.tasks.push($event)" />
                  </footer>
              </div>
          </template>
      </draggable>
    <button
        @click="createColumn"
        class="__create-column"
        >+ Add Another Column</button>
    </div>
</template>

<style lang='scss'>
.board-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    overflow-x: auto;
    .board {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        gap: 1rem;

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

                .__column-input {
                    background: transparent;
                    max-width: 190px;
                    border: none;
                    border-radius: 4px;
                    color: #aaaaaa;

                    &:focus {
                        background: #ffffff;
                        color: #4d31b0;
                        outline: none;
                    }
                }
            }
        }
    }

    .__create-column {
        background: #3f3f3f;
        border: none;
        padding: 5px;
        opacity: 0.5;
    }
}
</style>
