import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("MAIL_HOST"),
                    port: config.get<number>("MAIL_PORT"),
                    auth: {
                        user: config.get<string>("MAIL_USER"),
                        pass: config.get<string>("MAIL_PASS"),
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [MailerModule],
})
export class MailModule {}
