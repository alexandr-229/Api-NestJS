import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from '../review/review.model';
import { TelegramService } from '../telegram/telegram.service';
import { CreateProductDto } from './dto/create.product.dto';
import { FindProductDto } from './dto/find.product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>,
		private readonly telegramService: TelegramService
	) { }

	async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
		const result = await this.productModel.create(dto);
		const message = `Title: ${dto.title}\n`
			+ `Price: ${dto.price}\n`
			+ `Description: ${dto.description}\n`
			+ `ID: ${result._id}`;
		this.telegramService.sendMessage(message);
		return result;
	}

	async findById(id: string): Promise<DocumentType<ProductModel> | null> {
		const result = await this.productModel.findById(id).exec();
		return result;
	}

	async deleteById(id: string): Promise<DocumentType<ProductModel> | null> {
		const result = await this.productModel.findByIdAndDelete(id).exec();
		return result;
	}

	async updateById(id: string, dto: CreateProductDto): Promise<DocumentType<ProductModel> | null> {
		const result = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
		return result;
	}

	async findWithReviews(dto: FindProductDto) {
		const result: (ProductModel & {
			review: ReviewModel[],
			reviewCount: number,
			reviewAvg: number
		})[] = await this.productModel
			.aggregate()
			.match({ categories: dto.category })
			.sort({ _id: 1 })
			.limit(dto.limit)
			.lookup({
				from: 'Review',
				localField: '_id',
				foreignField: 'productId',
				as: 'reviews'
			})
			.addFields({
				reviewCount: { $size: '$reviews' },
				reviewAvg: { $avg: '$reviews.rating' },
				reviews: {
					$sortArray: {
						input: '$reviews',
						sortBy: { createdAt: -1 }
					}
				}
			})
			.exec();
		return result;
	}
}
