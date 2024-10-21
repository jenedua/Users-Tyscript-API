import { User } from "../../models/users";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {  IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    constructor(private readonly updateUsersRepository: IUpdateUserRepository){}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
       
        try {
            const  id  = httpRequest?.params?.id;
            const body = httpRequest?.body;
            
            if(!body){
                return {
                    statusCode: 400,
                    body: "Missing body"
                }
            }

            if(!id){
                return {
                    statusCode: 400,
                    body: "Missing user id"
                }
            }

            const allowedFielsToUpdate:(keyof UpdateUserParams)[] = ["firstname", "lastname", "password",];
            
            const someFieldIsNotAllowedToUpdate = Object.keys(body)
                .some((key) => !allowedFielsToUpdate.includes(key as keyof UpdateUserParams));
                
                if(someFieldIsNotAllowedToUpdate){
                    return {
                        statusCode: 400,
                        body: "Some received field is not allowed"
                    }
                }

            const user = await this.updateUsersRepository.updateUser(id, body);

            return {    
                statusCode: 200,
                body: user
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong" + error
            }
            
        }
        
    }

}