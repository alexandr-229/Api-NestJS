import { Get } from '@nestjs/common';
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ReviewModel } from './review.model'

@Controller('review')
export class ReviewController {
    
    @Post('create')
    async create(@Body() dto: Omit<ReviewModel, '_id'>) {

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('id') id: string) {

    }
}
