import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

//* SRP: AuthModule se encarga de todo lo relacionado con la autenticación.

@Module({
    imports: [
      ConfigModule, // para leer .env (si lo usas)
      UserModule,   // para poder usar el servicio de usuario
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRES_IN'), 
          },
        }),
        inject: [ConfigService],
      }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
  })
  export class AuthModule {}