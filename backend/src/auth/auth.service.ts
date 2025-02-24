import { Injectable, Inject, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserService } from "src/user/interfaces/user-service.interface";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { Usuarios } from "@prisma/client";
import { loginDto } from "./dtos/login.dto";
import { RequestPasswordResetDto, ResetPasswordDto } from "./dtos/password-reset.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { MailModule } from "src/mailer/mailer.module";
import * as crypto from "crypto"

//* LSP (Sustitución de Liskov): Podrías reemplazar userService por cualquier otra clase que cumpla la misma interfaz.

@Injectable()
export class AuthService {
    constructor (
        @Inject('IUserService')
        private readonly userService: IUserService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService
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

    async requestPasswordReset(data: RequestPasswordResetDto) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) throw new BadRequestException("User not found");

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetExpires = new Date(Date.now() + 3600000); // 1 hora

        // Ahora usamos `updateUser` de `userService`
        await this.userService.updateUser(user.id, {
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetExpires,
        });

        await this.mailerService.sendMail({
            to: user.email,
            subject: "Recuperación de contraseña",
            html: `
                <p>Hola,</p>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Por favor, copia el siguiente token y pégalo en el formulario de restablecimiento de contraseña:</p>
                <p><strong style="font-size: 18px;">${resetToken}</strong></p>
                <p>Este token expirará en 1 hora.</p>
            `,
        });

        return { message: "Email de recuperación enviado" };
    }

    async resetPassword(data: ResetPasswordDto) {
        const user = await this.userService.findByResetToken(data.token);
        if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            throw new BadRequestException("Token inválido o expirado");
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        await this.userService.updateUser(user.id, {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        });

        return { message: "Contraseña restablecida con éxito" };
    }

}
