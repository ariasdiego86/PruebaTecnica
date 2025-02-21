import { Usuarios } from "@prisma/client";
import { CreateUserDto } from "../dtos/create-user.dto";

/*data: {
        name: string;
        email: string;
        password: string;
    } */
export interface IUserRepository{
    createUser( data: CreateUserDto): Promise <Usuarios | null>;

    findByEmail(email: string): Promise<Usuarios | null>;   
}