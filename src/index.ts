import express from 'express';
import {config} from "dotenv";
import { GetUsersController } from './controllers/get-users/get-Users';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-users/mongo-create-user';
import { CreateUserController } from './controllers/create-users/create-user';


const main = async () => {
    config();
    const app = express();
    app.use(express.json());

    await MongoClient.connect();

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
     
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
     
        const { body, statusCode } = await getUsersController.handle();
     
         res.status(statusCode).send(body);
     });

     app.post('/users', async (req, res) => {
        //const mongoCreateUserRepository = new MongoCreateUser();
        const mongoCreateUserRepository = new MongoCreateUserRepository();
     
        const createUserController = new CreateUserController(mongoCreateUserRepository);
     
        const { body, statusCode } = await createUserController.handle({body: req.body});
     
       //return  res.send(body).status(statusCode);
         res.status(statusCode).send(body);
     });

    const port =process.env.PORT || 8000;

    app.listen(port, () => {console.log(`Listening on port ${port}`);});
}

main();
