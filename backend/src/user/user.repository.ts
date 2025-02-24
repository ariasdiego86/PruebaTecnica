import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import { IUserRepository } from './interfaces/user-repository.interface';
import { Usuarios } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';

//* Aquí usamos el PrismaService para interactuar con la tabla Usuarios.
//* DIP (Principio de Inversión de Dependencias): El servicio dependerá de IUserRepository, no de UserRepository directamente. Luego inyectaremos la clase concreta en el módulo

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto): Promise<Usuarios | null> {
        return this.prisma.usuarios.create({ data });
    }

    async findByEmail(email: string): Promise<Usuarios | null> {
        return this.prisma.usuarios.findUnique({ where: { email } });
    }
    // Aquí puedes añadir más métodos que necesites

    async findByResetToken(token: string): Promise<Usuarios | null> {
        return this.prisma.usuarios.findFirst({ where: { resetPasswordToken: token } });
    }

    async updateUser(userId: number, data: Partial<Usuarios>): Promise<Usuarios> {
        return this.prisma.usuarios.update({
            where: { id: userId },
            data,
        });
    }   
      
}