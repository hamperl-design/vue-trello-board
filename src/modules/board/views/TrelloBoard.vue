<script lang="ts" setup="">
import {ref} from "vue";
import type {Column} from "@/types";
import {nanoid} from "nanoid";

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
</script>

<template>
  <div class="board">
      <div class="__column" v-for="column in columns" :key="column.id">
          <header>
              {{ column.title }}
          </header>
          <p v-for="task in column.tasks" :key="task.id">
              {{task.title}}
          </p>
      </div>
  </div>
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
  }
}
</style>