import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { loginDto } from "./dtos/login.dto";
import { RequestPasswordResetDto, ResetPasswordDto } from "./dtos/password-reset.dto";

//@ApiBearerAuth() para indicar que requiere autenticación JWT
@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}


    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 200, description: 'User registered successfully' })
    async register(@Body() data: CreateUserDto) {
        const newUser = await this.authService.register(data);
        return {
            message: 'User registered successfully',
            data: newUser
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    async login (@Body() data: loginDto) {
        return this.authService.login(data);
    }

    @Post("request-password-reset")
    @ApiOperation({ summary: "Request password reset" })
    @ApiResponse({ status: 200, description: "Password reset email sent" })
    async requestPasswordReset(@Body() data: RequestPasswordResetDto) {
        return this.authService.requestPasswordReset(data);
    }

    @Post("reset-password")
    @ApiOperation({ summary: "Reset password" })
    @ApiResponse({ status: 200, description: "Password reset successful" })
    async resetPassword(@Body() data: ResetPasswordDto) {
        return this.authService.resetPassword(data);
    }

}

