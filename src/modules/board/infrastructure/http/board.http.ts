import axios from "axios";
import type {AxiosResponse} from "axios";
import type {Column} from "@/types";
import type {BoardDto} from "@/types/dto/Board.dto";

export function useBoardHttp() {
    const getAllTasks = async ():Promise<AxiosResponse<BoardDto>>  => {
        return axios.get<BoardDto>(`http://localhost:8081/api/tasks`)
    }

    const storeTasks = async (tasks: Column[]): Promise<AxiosResponse<{message: string}>> => {
        return axios.post<{message: string}>(`http://localhost:8081/api/tasks`, tasks)
    }

    return {
        getAllTasks,
        storeTasks
    }
}
