import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import {  IGetUsersRepository } from "./protocols";
import { User } from "../../models/users";

export class GetUsersController implements IController { 
    // getUsersRepository: IGetUsersRepository;

    // constructor(getUsersRepository: IGetUsersRepository) {
    //     this.getUsersRepository = getUsersRepository;
    // }   
    constructor(readonly getUsersRepository: IGetUsersRepository){}     
    async handle() : Promise<HttpResponse<User[] | string>> {
        try {
            // validar se o usuário existe
            // direcionar a chamada para o repositório
            const users = await this.getUsersRepository.getUsers();
            return ok<User[]>(users);
            
        } catch (error) {
            return serverError(error)
            
        }
        

    }


}