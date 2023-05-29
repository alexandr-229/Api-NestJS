import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { subDays } from 'date-fns';
import { CreatePageDto } from './dto/create.page.dto';
import { FindPageDto } from './dto/find.page.dto';
import { PageModel } from './page.model';
import { Types } from 'mongoose';

@Injectable()
export class PageService {
	constructor(
		@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>
	) { }

	async create(dto: CreatePageDto): Promise<DocumentType<PageModel>> {
		const result = await this.pageModel.create(dto);
		return result;
	}

	async findById(id: string | Types.ObjectId): Promise<DocumentType<PageModel> | null> {
		const result = await this.pageModel.findById(id).exec();
		return result;
	}

	async findAll(): Promise<DocumentType<PageModel>[]> {
		const result = await this.pageModel.find({ }).exec();
		return result;
	}

	async findByText(text: string): Promise<DocumentType<PageModel>[]> {
		const result = await this.pageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
		return result;
	}

	async findByAlias(alias: string): Promise<DocumentType<PageModel> | null> {
		const result = await this.pageModel.findOne({ alias }).exec();
		return result;
	}

	async findForJustJoinItUpdate(date: Date): Promise<DocumentType<PageModel>[]> {
		const result = await this.pageModel.find({
			firstCategory: 0,
			$or: [
				{ 'justjoinit.updatedAt': { $lt: subDays(date, 1) } },
				{ 'justjoinit.updatedAt': { $exists: false } }
			]
		}).exec();
		return result;
	}

	async deleteById(id: string | Types.ObjectId): Promise<DocumentType<PageModel> | null> {
		const result = await this.pageModel.findByIdAndDelete(id).exec();
		return result;
	}

	async updateById(id: string | Types.ObjectId, dto: CreatePageDto): Promise<DocumentType<PageModel> | null> {
		const result = await this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
		return result;
	}

	async findByCategory({ firstCategory }: FindPageDto): Promise<DocumentType<PageModel>[]> {
		const result = await this.pageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: {
					$push: {
						alias: '$alias',
						title: '$title',
						category: '$category',
					}
				}
			})
			.sort({ '_id.secondCategory': 1 })
			.exec();
		return result;
	}
}
