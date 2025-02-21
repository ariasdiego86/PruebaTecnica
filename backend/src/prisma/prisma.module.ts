import { Global, Module} from "@nestjs/common";
import { PrismaService } from "./prisma.service";

// *Lo primero es exponer el PrismaService para que cualquier otro módulo lo use cuando necesite acceso a la base de datos.


//@Global()  Decorador para hacerlo accesible en toda la app. Se usa @Global() para que no tener que importar el módulo en cada módulo que necesite PrismaService. (Opcional, pero común.)
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Lo exportamos para que lo usen otros módulo
})
export class PrismaModule {}


