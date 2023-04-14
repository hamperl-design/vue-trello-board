<script  lang="ts" setup="">
import type { Task } from "@/types";
import { nanoid} from "nanoid";
import {ref} from "vue";

const emit = defineEmits<{
    (e: "add", payload: Task): void
}>()

const focused = ref<boolean>(false)
const title = ref<string>('')

const createTask = (e: Event) => {
    if (title.value.trim()) {
        e.preventDefault()
        emit('add', {
            title: title.value.trim(),
            createdAt: new Date(),
            id: nanoid(),
        } as Task)
    }
    title.value = "";
}
</script>

<template>
    <div>
        <textarea
            v-model="title"
            @keydown.tab="createTask"
            @keydown.enter="createTask"
            style="outline: none !important;"
            @focus="focused = true"
            @blur="focused = false"
            :placeholder="!focused ? '+ Add a Card' : 'Enter a title for a new task'"
        />
    </div>
</template>

<style lang="scss" scoped></style>
