import validator from "validator";
import { User } from "../../models/users";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //Verificar campos obrigatórios
    //   console.log(httpRequest.body);
    //   console.log(validator.isEmail("emailinvalido")); // Deve retornar false
    //   console.log(validator.isEmail("email@valido.com")); // Deve retornar true
      const requiredFields = ["firstname", "lastname", "email", "password"];
      for (const field of requiredFields) {
          if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
              return {
                  statusCode: 400,
                  body: `Field ${field} is required`,
              };
          }
      }

      //Verificar se o email é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if((!emailIsValid)) {
          return {
              statusCode: 400,
              body: 'Invalid email'
          };
      }
    //   const requiredFields = ["firstname", "lastname", "email", "password"];

      // Checa se os campos obrigatórios estão presentes
    //   for (const field of requiredFields) {
    //     if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
    //       return {
    //         statusCode: 400,
    //         body: `Field ${field} is required`,
    //       };
    //     }
    //   }
    // for (const field of requiredFields) {
    //     const value = httpRequest?.body?.[field as keyof CreateUserParams];
    //     console.log(`Valor de ${field}:`, value);  // Adicione log para cada campo
    //     if (!value?.length) {
    //         return {
    //             statusCode: 400,
    //             body: `Field ${field} is required`,
    //         };
    //     }
    // }

      // Verificar se o email é válido
      //const email = httpRequest?.body?.email;
    //   const email = httpRequest.body!.email.trim();

    //   if (!email) {
    //     return {
    //       statusCode: 400,
    //       body: "Field email is required",
    //     };
    //   }

    //   const emailIsValid = validator.isEmail(email);
    //   if (!emailIsValid) {
    //     return {
    //       statusCode: 400,
    //       body: "Invalid email",
    //     };
    //   }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: user,
      };
      
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong " + error,
      };
    }
  }
}
