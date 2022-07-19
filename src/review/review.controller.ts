import { Get } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.conts';

@Controller('review')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService
    ) { }
    
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if(deletedDoc == null) {
            throw new HttpException(REVIEW_NOT_FOUND, 404)
        }
        return deletedDoc
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string) {
        return this.reviewService.findByProductId(productId)
    }
}
