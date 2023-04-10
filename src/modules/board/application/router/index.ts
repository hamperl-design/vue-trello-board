import TrelloBoard from "@/modules/board/views/TrelloBoard.vue";
import type {RouteRecordRaw} from "vue-router";

export const BoardRouter: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'TrelloBoard',
        component: TrelloBoard
    }
]