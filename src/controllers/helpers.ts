import { HttpResponse, HttpStatusCode } from "./protocols"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ok =<T> (body: any):HttpResponse<T> => {
    return {
        statusCode: HttpStatusCode.ok,
        body
    }
}
export const created =<T> (body: any): HttpResponse<T> => {
    return {
        statusCode: HttpStatusCode.created,
        body
    }
}
export const badRequest = (message: string) : HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.badRequest,
        body: message
    }
}
export const serverError = (error: any) : HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.serverError,
        body: "Something went wrong" + error
    }
}