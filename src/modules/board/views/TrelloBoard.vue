<script lang="ts" setup="">
import TrelloBoardTask from "@/modules/board/views/components/TrelloBoardTask.vue";
import draggable from "vuedraggable";
import DragHandle from "@/modules/board/views/components/DragHandle.vue";
import {useKeyModifier, useLocalStorage} from "@vueuse/core";
import NewTask from "@/modules/board/views/components/NewTask.vue";
import {useBoardStore} from "@/modules/board/infrastructure/store/board.store";
import {onMounted} from "vue";
import {useBoardService} from "@/modules/board/application/board.service";

const alt = useKeyModifier('Control')
const boardStore = useBoardStore()
const {boardLoader, storeNewBoard} = useBoardService()

onMounted(async () => {
    await boardLoader()
})
</script>

<template>
    <div v-if="boardStore.boardLoader && boardStore.columns.length === 0">Loading Board - Please wait...</div>
    <div v-else class="board-wrapper">
        <draggable
            v-model="boardStore.columns"
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
                              @keydown.backspace="column.title === '' ? (boardStore.columns = boardStore.columns.filter(c => c.id !== column.id)) : null"
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
                              <div v-if="task">
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
            @click="boardStore.createColumn"
            class="__create-column"
            >+ Add Another Column</button>
        <button
            @click="storeNewBoard(boardStore.columns)"
            class="__create-column"
        >Save All</button>
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
