import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { enviromentVariables } from "src/config";
import { TransportsModule } from "src/transports/transports.module";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: enviromentVariables.jwtSecret,
			signOptions: {
				expiresIn: "2h",
			},
		}),
		TransportsModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
