import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewModule } from 'src/review/review.module';
import { TelegramModule } from '../telegram/telegram.module';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: {
				collection: 'Product'
				}
			}
		]),
		TelegramModule,
		ReviewModule
	],
	controllers: [ProductController],
	providers: [ProductService]
})
export class ProductModule {}
