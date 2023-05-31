import { IsNumber } from 'class-validator';

export class FindPopularDto {
	@IsNumber()
	limit: number;
}
