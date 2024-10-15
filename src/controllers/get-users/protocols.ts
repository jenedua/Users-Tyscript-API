import { User } from "../../models/users";

export interface IGetUsersController {
    handle(): Promise<HttpResponse<User[]>>;
}
export interface IGetUsersRepository {
    getUsers(): Promise<User[]>;
}