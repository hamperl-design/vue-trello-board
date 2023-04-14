import {defineStore} from "pinia";
import {computed, nextTick, ref} from "vue";
import type {Column} from "@/types";
import {nanoid} from "nanoid";

export const useBoardStore = defineStore('boardStore', () => {
    const columns = ref<Column[]>([])
    const numberOfTasks = computed<number>(() => {
        return columns.value.reduce((prev, cur) => {
            return prev += cur.tasks.length
        }, 0)
    })

    async function createColumn() {
        const column: Column = {
            id: nanoid(),
            title: '',
            tasks: []
        }

        columns.value.push(column)
        await nextTick(() => {
            (document.querySelector('.__column:last-of-type .title-input') as HTMLInputElement).focus()
        })
    }

    return {
        columns,
        numberOfTasks,
        createColumn
    }
})
