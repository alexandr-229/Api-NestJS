import {
	Controller,
	Post,
	Body,
	Delete,
	Param,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.const';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id.validation.pipe';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		const result = await this.reviewService.create(dto);
		return result;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if(!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
		const result = await this.reviewService.findByProductId(productId);
		return result;
	}
}
