import {
    Post,
    Controller, 
    Body,
    Get,
    Param,
    Delete,
    HttpException,
    HttpCode,
    Patch,
    UsePipes,
    ValidationPipe,
    UseGuards
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.const'
import { IdValidationPipe } from '../pipes/id-validation-pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){ }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto)
    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);
        if(!product){
            throw new HttpException(PRODUCT_NOT_FOUND_ERROR, 404)
        }
        return product
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedProduct = await this.productService.delete(id);
        if(!deletedProduct){
            throw new HttpException(PRODUCT_NOT_FOUND_ERROR, 404)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
        const updatedProduct = await this.productService.updateById(id, dto);
        if(!updatedProduct){
            throw new HttpException(PRODUCT_NOT_FOUND_ERROR, 404)
        }
        return updatedProduct
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto)
    }
}
