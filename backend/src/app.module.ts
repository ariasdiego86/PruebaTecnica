import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


//Si se usa @Global() en PrismaModule, no es estrictamente necesario importarlo en cada módulo, pero es buena práctica importarlo en AppModule para dejarlo claro.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
