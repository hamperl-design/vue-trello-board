import {defineStore} from "pinia";
import {nextTick, ref} from "vue";
import type {Column} from "@/types";
import {nanoid} from "nanoid";

export const useBoardStore = defineStore('boardStore', () => {
    const columns = ref<Column[]>([])

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
        createColumn
    }
})
