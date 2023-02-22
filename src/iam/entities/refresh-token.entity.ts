import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	tokenId: string;

	@Column()
	userId: string;
}
