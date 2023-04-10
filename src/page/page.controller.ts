import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Delete,
	Patch,
	HttpCode,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { CreatePageDto } from './dto/create.page.dto';
import { FindPageDto } from './dto/find.page.dto';
import { PageService } from './page.service';
import { PAGE_NOT_FOUND } from './page.const';
import { JustjoinitService } from '../justjoinit/justjoinit.service';

@Controller('page')
export class PageController {
	constructor(
		private readonly pageService: PageService,
		private readonly justjoinitService: JustjoinitService,
		private readonly schedulerRegistry: SchedulerRegistry
	) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		const result = await this.pageService.create(dto);
		return result;
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const result = await this.pageService.findById(id);
		if(!result) {
			throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const result = await this.pageService.deleteById(id);
		if(!result) {
			throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
		const result = await this.pageService.updateById(id, dto);
		if(!result) {
			throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		const result = await this.pageService.findByCategory(dto);
		return result;
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		const result = await this.pageService.findByText(text);
		return result;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async setJustJoinItData() {
		const pages = await this.pageService.findForJustJoinItUpdate(new Date());
		for(const page of pages) {
			const justjoinitData = await this.justjoinitService.getData(page.category);
			page.justjoinit = justjoinitData;
			await this.pageService.updateById(page._id, page);
		}
	}
}
