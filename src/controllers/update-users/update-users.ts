
import { User } from "../../models/users";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {  IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    constructor(private readonly updateUsersRepository: IUpdateUserRepository){}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
       
        try {
            const  id  = httpRequest?.params?.id;
            const body = httpRequest?.body;
            
            if(!body){
                return badRequest("Missing body");
            }

            if(!id){
                return badRequest("Missing user id");
            }

            const allowedFielsToUpdate:(keyof UpdateUserParams)[] = ["firstname", "lastname", "password",];
            
            const someFieldIsNotAllowedToUpdate = Object.keys(body)
                .some((key) => !allowedFielsToUpdate.includes(key as keyof UpdateUserParams));
                
                if(someFieldIsNotAllowedToUpdate){
                    return badRequest("Some received field is not allowed");
                }

            const user = await this.updateUsersRepository.updateUser(id, body);
            return ok<User>(user);

            
        } catch (error) {
            return serverError(error);
            
        }
        
    }

}