import { OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { InvalidatedRefreshTokenError } from "./classes/refreshToken-error.class";

@Injectable()
export class RefreshTokenIdsStorage
	implements OnApplicationBootstrap, OnApplicationShutdown
{
	private refreshToken: any;
	constructor(
		@InjectRepository(RefreshToken)
		private readonly tokensRepository: Repository<RefreshToken>
	) {}

	onApplicationBootstrap() {
		this.refreshToken = new RefreshToken();
	}
	onApplicationShutdown(signal?: string) {
		this.deleteTokenStorageTable();
	}

	async deleteTokenStorageTable() {
		return await this.tokensRepository.remove(this.refreshToken);
	}

	async insert(userId: number, tokenId: string): Promise<void> {
		this.refreshToken.tokenId = tokenId;
		this.refreshToken.userId = userId;
		await this.tokensRepository.save(this.refreshToken);
	}

	async validate(userId: number, tokenId: string): Promise<boolean> {
		const storedId = await this.tokensRepository.findOneBy({
			userId: userId.toString()
		});
		if (storedId.tokenId !== tokenId) {
			throw new InvalidatedRefreshTokenError();
		}
		return storedId.tokenId === tokenId;
	}

	async invalidate(userId: number): Promise<void> {
		await this.tokensRepository.delete(userId);
	}

	private getKey(userId: number): string {
		return `user-${userId}`;
	}
}
