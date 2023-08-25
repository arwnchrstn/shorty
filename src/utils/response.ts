import { ResponseData } from "@/model/IResponseData"

type Data = Partial<ResponseData> | unknown
type ResponseDetails = {
    [key: string]: {
        message: string,
        code: number
        data?: Data
    }
}

const responseDetails: ResponseDetails = {
    "SUCCESS": {
        message: "Success",
        code: 0
    },
    "NOT_FOUND": {
        message: "Not Found",
        code: 0
    },
    "BAD_REQUEST": {
        message: "Bad Request",
        code: 0
    },
    "SERVER_ERROR": {
        message: "Server Error",
        code: 0
    },
} as const

const getCode = <T extends keyof typeof responseDetails>(code: T) => responseDetails[code];

export const response = <T extends keyof typeof responseDetails>(code: T, data: Data) => {
    const response = getCode(code)
    response.data = data

    return response
}