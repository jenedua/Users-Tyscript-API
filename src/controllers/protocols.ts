
export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T ;
}
  
export interface HttpRequest<B> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers?: any;
    body?: B;
}
 export enum HttpStatusCode {
   ok = 200,
   created = 201,
   noContent = 204,
   badRequest = 400,
   unauthorized = 401,
   forbidden = 403,
   notFound = 404,
   serverError = 500
 }
export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}