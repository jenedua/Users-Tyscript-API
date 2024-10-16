import { User } from "../../models/users";
export interface CreateUserParams {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface ICreateUsersRepository {
    createUser(params: CreateUserParams): Promise<User>
}