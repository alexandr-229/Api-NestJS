import {
    Get,
    UseGuards,
    Controller, 
    Post,
    Body,
    Delete,
    Param,
    HttpException,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.conts';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation-pipe';


@Controller('review')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService
    ) { }
    
    @UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if(deletedDoc == null) {
            throw new HttpException(REVIEW_NOT_FOUND, 404)
        }
        return deletedDoc
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
        return this.reviewService.findByProductId(productId)
    }
}
