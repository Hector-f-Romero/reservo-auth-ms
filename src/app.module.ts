import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { TransportsModule } from "./transports/transports.module";

@Module({
	imports: [AuthModule, TransportsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
