import type { UUID } from "node:crypto";

export class JwtAppPayload {
	id: UUID;
	username: string;
}
