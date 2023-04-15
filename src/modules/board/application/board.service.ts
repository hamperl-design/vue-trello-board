import {useBoardStore} from "@/modules/board/infrastructure/store/board.store";
import {useBoardHttp} from "@/modules/board/infrastructure/http/board.http";
import type {Column} from "@/types";

export function useBoardService() {
    const boardStore = useBoardStore()
    const boardHttp = useBoardHttp()
    const boardLoader= async () => {
        boardStore.boardLoader = true
        boardHttp.getAllTasks()
            .then(response => {
                if (response.status < 400) {
                    boardStore.columns = response.data.data
                    // setTimeout(() => {
                    //     boardStore.columns = response.data.data
                    //     boardStore.boardLoader = false
                    // }, 2000)
                } else {
                    console.error('Error while loading Tasks')
                }
            })
            .catch(err => {
                console.error('Error while loading Tasks: ', err)
            })
            .finally(() => {
                boardStore.boardLoader = false
            })
    }
    const storeNewBoard = async (board: Column[]) => {
        boardHttp.storeTasks(board)
            .then(response => {
                if (response.status < 400) {
                    console.log('Board Stored!')
                }
            })
            .catch(err => {
                console.log('Error while store new Board...', err)
            })
    }

    return {
        boardLoader,
        storeNewBoard
    }
}
