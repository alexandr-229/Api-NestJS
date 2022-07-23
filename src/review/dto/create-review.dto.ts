import { IsString, IsNumber, Max, Min } from 'class-validator'

export class CreateReviewDto {

    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @Max(5, { message: 'Рейтинг не может быть больше 5' })
    @Min(1, { message: 'Рейтинг не может быть меньше 1' })
    rating: number;

    @IsString()
    productId: string;
}