import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {useRoutes} from "@/modules/core/application/router";
import {createRouter, createWebHistory} from "vue-router";

import 'bootstrap/scss/bootstrap.scss'


const app = createApp(App)
const routes = useRoutes().initRoutes()
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

app.use(createPinia())
app.use(router)

app.mount('#app')
