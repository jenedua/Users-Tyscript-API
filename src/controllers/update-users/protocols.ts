import { User } from "../../models/users";

export interface UpdateUserParams {
    firstname?: string;
    lastname?: string;
    password?: string;
}
export interface IUpdateUserRepository {
    updateUser( id: string, params: UpdateUserParams): Promise<User>;
}