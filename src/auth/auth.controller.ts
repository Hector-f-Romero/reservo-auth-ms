import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import type { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern("auth.login")
	login(@Payload() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@MessagePattern("auth.verify")
	verifyToken(@Payload() token: string) {
		console.log("CONTROLADOR");
		console.log(token);
		return this.authService.verifyToken(token);
	}
}
