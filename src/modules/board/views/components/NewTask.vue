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
    <div class="add-task">
        <textarea
            v-model="title"
            class="__add-task-field"
            @keydown.tab="createTask"
            @keydown.enter="createTask"
            style="outline: none !important;"
            @focus="focused = true"
            @blur="focused = false"
            :placeholder="!focused ? '+ Add a Card' : 'Enter a title for a new task'"
        />
    </div>
</template>

<style lang="scss" scoped>
.add-task {
    .__add-task-field {
        width: 100%;
        color: #666666;
        border: none;
        background-color: transparent;
        &:focus {
            background-color: #FFFFFF;
            box-shadow: 2px 2px 4px #00000022;
            height: 4rem
        }
    }
}
</style>
