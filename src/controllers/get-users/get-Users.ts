import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController { 
    // getUsersRepository: IGetUsersRepository;

    // constructor(getUsersRepository: IGetUsersRepository) {
    //     this.getUsersRepository = getUsersRepository;
    // }   
    constructor(readonly getUsersRepository: IGetUsersRepository){}     
    async handle(){
        try {
            // validar se o usuário existe
            // direcionar a chamada para o repositório
            const users = await this.getUsersRepository.getUsers();
            return {
                statusCode: 200,
                body: users
            };
            
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong ' + error   
                
            };
            
        }
        

    }


}