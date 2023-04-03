import { Type } from 'class-transformer';
import { IsString, IsNumber, ValidateNested, IsArray, IsEnum } from 'class-validator';

export enum TopLevelCategories {
	Courses,
	Services,
	Books,
	Products
}

class HHData {

	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

class PageAdvatange {

	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreatePageDto {
	@IsEnum(TopLevelCategories)
	firstCategory: TopLevelCategories;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@ValidateNested()
	hh?: HHData;

	@IsArray()
	@ValidateNested()
	@Type(() => PageAdvatange)
	advatanges: PageAdvatange[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
