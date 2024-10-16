import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";
import { CreateUserParams, ICreateUsersRepository } from "./protocols";

export class MongoCreateUser implements ICreateUsersRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        
        const { insertedId } = await MongoClient.db
        .collection('users')
        .insertOne(params);

        const user = await MongoClient.db
        .collection<Omit<User, 'id'>>('users')
        .findOne({ _id: insertedId });

        if (!user) {
            throw new Error('User not found');
        }

        

        const  { _id, ...rest } = user;

        return { id: _id.toHexString(), ...rest };
        
        
    }

}