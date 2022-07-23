import { IsString, IsNumber, IsOptional, ValidateNested, IsArray, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { TopLevelCategory } from '../page.model'

class HHDataDto {

    @IsNumber()
    count: number;

    @IsNumber()
    jniorSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;
}

class PageAdvantegDto {

    @IsString()
    title: string;

    @IsString()
    description: string;
}


export class CreatePageDto {

    @IsEnum(TopLevelCategory)
    firstLevelCategory: TopLevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    title: string;

    @IsString()
    alias: string;

    @IsString()
    category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => HHDataDto)
    hh?: HHDataDto;

    @IsArray()
    @ValidateNested()
    @Type(() => PageAdvantegDto)
    advantages: PageAdvantegDto[];

    @IsString()
    seoText: string;

    @IsString()
    tagsTitle: string;

    @IsString({ each: true })
    tags: string[];
}