import {useBoardStore} from "@/modules/board/infrastructure/store/board.store";
import {useBoardHttp} from "@/modules/board/infrastructure/http/board.http";

export function useBoardService() {
    const boardStore = useBoardStore()
    const boardHttp = useBoardHttp()
    const boardLoader= async () => {
        boardHttp.getAllTasks()
            .then(response => {
                if (response.status < 400) {
                    boardStore.columns = response.data.data
                } else {
                    console.error('Error while loading Tasks')
                }
            })
            .catch(err => {
                console.error('Error while loading Tasks: ', err)
            })
    }

    return {
        boardLoader
    }
}
