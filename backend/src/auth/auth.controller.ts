import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

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
    async login (@Body() body: {email: string, password: string}) {
        return this.authService.login(body.email, body.password);
    }
}

