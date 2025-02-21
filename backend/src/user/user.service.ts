import { Injectable, BadRequestException, Inject } from "@nestjs/common";
//import { UserRepository } from "./user.repository";
import { IUserService } from "./interfaces/user-service.interface";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { Usuarios } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dtos/create-user.dto";

/* OCP (Principio Abierto/Cerrado): Si en un futuro quieres cambiar la lógica de hashing, solo modificas la parte interna sin afectar a los controladores o al repositorio.
ISP (Principio de Segregación de Interfaces): Mantener las interfaces de repositorio y servicio separadas hace que cada capa use solamente lo que necesita. */

@Injectable()
export class UserService implements IUserService {
    constructor( @Inject('IUserRepository') private readonly userRepository: IUserRepository) {}
    
    async registerUser(data: CreateUserDto): Promise<Usuarios | null> {
        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await this.hashPassword(data.password);

        return this.userRepository.createUser({
            ...data,
            password: hashedPassword
        });
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }    

    async findByEmail(email: string): Promise<Usuarios | null> {
        return this.userRepository.findByEmail(email);
    }
}