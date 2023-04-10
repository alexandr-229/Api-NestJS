import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategories {
	Courses,
	Services,
	Books,
	Products
}

export class JustJoinItData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;

	@prop()
	updatedAt: Date;
}

class PageAdvatange {

	@prop()
	title: string;

	@prop()
	description: string;
}

export interface PageModel extends Base {}

@index({ '$**': 'text' })
export class PageModel extends TimeStamps {

	@prop({ enum: TopLevelCategories })
	firstCategory: TopLevelCategories;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => JustJoinItData })
	justjoinit?: JustJoinItData;

	@prop({ type: () => [PageAdvatange] })
	advatanges: PageAdvatange[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
