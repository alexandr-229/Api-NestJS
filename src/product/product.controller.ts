import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { FindProductDto } from './dto/find.product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.const';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { FindPopularDto } from './dto/popular.product.dto';

@Controller('product')
export class ProductController {
	constructor(
		private readonly productService: ProductService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		const result = await this.productService.create(dto);
		return result;
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if(!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.deleteById(id);
		if(!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const product = await this.productService.updateById(id, dto);
		if(!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		const result = await this.productService.findWithReviews(dto);
		return result;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('popular')
	async getPopular(@Body() dto: FindPopularDto) {
		const result = await this.productService.findPopular(dto.limit);
		return result;
	}
}
