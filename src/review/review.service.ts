import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewModel } from './review.model';

type DeleteResult =  {
	ok?: number | undefined;
	n?: number | undefined;
} & { deletedCount?: number | undefined };

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>
	) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		const result = await this.reviewModel.create(dto);
		return result;
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		const result = await this.reviewModel.findByIdAndDelete(id).exec();
		return result;
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
		const result = await this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
		return result;
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		const result = await this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
		return result;
	}

	async findPopularProducts(limit: number): Promise<Types.ObjectId[]> {
		const reviews: { _id: Types.ObjectId, reviewCount: number }[] = await this.reviewModel.aggregate()
			.group({
				_id: '$productId',
				reviewCount: { $sum: 1 }
			})
			.sort({ reviewCount: -1 })
			.limit(limit)
			.exec();
		const result: Types.ObjectId[] = reviews.map(({ _id }) => _id);
		return result;
	}
}
