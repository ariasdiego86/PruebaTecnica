import { Controller, Post, Body, Inject } from "@nestjs/common";
import { IUserService } from "./interfaces/user-service.interface";
import { CreateUserDto } from "./dtos/create-user.dto";


@Controller('user')
export class UserController {
    constructor(
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) {}

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto){
        const newUser = await this.userService.registerUser(createUserDto);

        return {
            message: 'User registered successfully',
            data: newUser            
        };
    }
    
}