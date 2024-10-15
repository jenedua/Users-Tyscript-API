import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return  [{
            firstname: 'Fedner',
            lastname: 'Dabady',
            email: 'fedner@gmail.com',
            password: '123456'

        },
    ];
    }

}