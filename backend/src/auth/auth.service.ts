import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserService } from "src/user/interfaces/user-service.interface";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { Usuarios } from "@prisma/client";
import { loginDto } from "./dtos/login.dto";

//* LSP (Sustitución de Liskov): Podrías reemplazar userService por cualquier otra clase que cumpla la misma interfaz.

@Injectable()
export class AuthService {
    constructor (
        @Inject('IUserService')
        private readonly userService: IUserService,
        private readonly jwtService: JwtService,
    ) {}

    async register (data: CreateUserDto) {
        const user = await this.userService.registerUser(data);

        return {
            message: 'User registered successfully',
            data: user
        }
    }

    async validateUser(email: string, password: string): Promise<Usuarios> {

        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return user;                
    }

    async login(data : loginDto) {
        const user = await this.validateUser(data.email, data.password);

        // Generar JWT
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { message: "User logged in successfully", token };            
    }

}
