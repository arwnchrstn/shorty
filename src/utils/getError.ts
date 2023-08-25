import { IResponseDataError } from '@/models/IResponseData'
import { AxiosError } from 'axios'

interface IProcessedError {
    message: string
    error: string | Error
}

export const getError = (error: AxiosError<IResponseDataError>): IProcessedError => {
    return {
        message: error.response!.data.message || error.name ,
        error: error.response!.data.data || error.message
    }
}