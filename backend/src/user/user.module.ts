// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
//import { IUserRepository } from './interfaces/user-repository.interface';
//import { IUserService } from './interfaces/user-service.interface';
import { UserController } from './user.controller';

//* Aquí inyectamos el UserRepository en el UserService y UserService en el UserController.
//* Luego, exportamos el UserService para que otros módulos puedan usarlo.

/*Observa cómo se inyecta la interfaz usando su token (IUserRepository o IUserService) y se dice que la implementación concreta es UserRepository o UserService.

Alternativa: usar class providers (inyección de clases) si no necesitas la interfaz, pero aquí querías la interfaz para DIP. */

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository', 
      useClass: UserRepository,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
