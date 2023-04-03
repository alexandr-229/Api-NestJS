import { IsEnum } from 'class-validator';
import { TopLevelCategories } from '../page.model';

export class FindPageDto {

	@IsEnum(TopLevelCategories)
	firstCategory: TopLevelCategories;
}