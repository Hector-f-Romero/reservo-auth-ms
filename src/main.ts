import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";
import { enviromentVariables } from "./config";

async function bootstrap() {
	const logger = new Logger("Auth-MS");

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.NATS,
			options: {
				servers: [enviromentVariables.natsSever],
			},
		},
	);

	await app.listen();

	logger.log(
		`Auth MS has been connected to NATS server: ${enviromentVariables.natsSever} 🔥`,
	);
}
bootstrap();
