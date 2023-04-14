import type {RouteRecordRaw} from "vue-router";
import {BoardRouter} from "@/modules/board/application/router";

export function useRoutes() {
    const initRoutes = () => {
       return [
           ...BoardRouter
        ]
    }

    return {initRoutes}
}