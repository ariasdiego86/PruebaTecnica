import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

//* SRP (Principio de Responsabilidad Única): El PrismaService se encarga únicamente de conectar y desconectar la base de datos.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    async onModuleInit() {
        await this.$connect();
    }
    
    async onModuleDestroy() {
        await this.$disconnect();
    }
}