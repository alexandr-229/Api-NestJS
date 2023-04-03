import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategories {
	Courses,
	Services,
	Books,
	Products
}

class HHData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
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

	@prop({ type: () => HHData })
	hh?: HHData;

	@prop({ type: () => [PageAdvatange] })
	advatanges: PageAdvatange[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
