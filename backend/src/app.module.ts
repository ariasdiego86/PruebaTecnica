import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mailer/mailer.module';


//Si se usa @Global() en PrismaModule, no es estrictamente necesario importarlo en cada módulo, pero es buena práctica importarlo en AppModule para dejarlo claro.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,    
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
