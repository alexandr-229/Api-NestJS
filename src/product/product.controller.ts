import { Patch } from '@nestjs/common';
import { Post, Controller, Body, Get, Param, Delete } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto'

@Controller('product')
export class ProductController {

    @Post()
    async create(@Body() dto: Omit<ProductModel, '_id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string) {

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: ProductModel) {

    }

    @Post()
    async find(@Body() dto: FindProductDto) {
        
    }
}
