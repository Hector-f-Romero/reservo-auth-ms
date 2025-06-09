import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { firstValueFrom } from "rxjs";

import type { JwtAppPayload } from "./dto/jwt-payload.dto";
import type { LoginUserDto } from "./dto/login-user.dto";
import { enviromentVariables, SERVICES } from "src/config";

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(SERVICES.NATS_SERVICE) private readonly client: ClientProxy,
	) {}

	async signToken(payload: JwtAppPayload) {
		return await this.jwtService.signAsync(payload);
	}

	async verifyToken(token: string) {
		try {
			console.log(token);

			const payload = await this.jwtService.verifyAsync(token, {
				secret: enviromentVariables.jwtSecret,
			});

			const newToken = await this.signToken({
				id: payload.id,
				username: payload.username,
			});

			return {
				status: "OK",
				code: 200,
				message: { newToken },
			};
		} catch (error) {
			if (error instanceof JsonWebTokenError) {
				return {
					status: HttpStatus[HttpStatus.BAD_REQUEST],
					code: HttpStatus.BAD_REQUEST,
					message: error.message,
				};
			}
			return {
				status: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				message: error.message,
			};
		}
	}
	async login(loginUserDto: LoginUserDto) {
		// 1. Verificar que el usuario existe en la BD llamando al MS.
		const userMsResponse = await firstValueFrom(
			this.client.send("users.auth.login", loginUserDto),
		);

		// 2. Si el usuario no existe o la contraseña es incorrecta, manda al gateway un error.
		if (userMsResponse.code !== 200) {
			return {
				status: userMsResponse.status,
				code: userMsResponse.code,
				message: userMsResponse.message,
			};
		}

		const { id, username } = userMsResponse.message;

		// 3. Firmar el token
		const jwt = await this.signToken({ id, username });
		console.log("TOKEN FIRMADO");

		// 4. Envía al gateway el token firmado.
		return { status: "OK", code: 200, message: { username, id, token: jwt } };
	}
}
