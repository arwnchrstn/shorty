import { IUrlStats } from "./IUrlStats"

export interface IResponseData {
    message: string
    code: number
    data: IUrlStats & string & undefined
}

export interface IResponseDataError extends Omit<IResponseData, "data"> {
    data: Error | string
}