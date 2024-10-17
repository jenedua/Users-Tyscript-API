import { User } from "../../models/users";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateUserController {
    handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>>
}
export interface CreateUserParams {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>
}