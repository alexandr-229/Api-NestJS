import {
    Post,
    Controller, 
    Body,
    Get,
    Param,
    Delete,
    Patch,
    HttpCode,
    HttpException,
    UseGuards
} from '@nestjs/common';
import { FindPageDto } from './dto/find-page.dto'
import { IdValidationPipe } from '../pipes/id-validation-pipe';
import { CreatePageDto } from './dto/create-page.dto'
import { PageService } from './page.service';
import { PAGE_NOT_FOUND_ERROR } from './page.const'
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('page')
export class PageController {

    constructor(
        private readonly pageService: PageService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreatePageDto) {
        return this.pageService.create(dto);
    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const page = await this.pageService.findById(id);
        if(!page){
            throw new HttpException(PAGE_NOT_FOUND_ERROR, 404)
        }
        return page
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') id: string) {
        const page = await this.pageService.findByAlias(id);
        if(!page){
            throw new HttpException(PAGE_NOT_FOUND_ERROR, 404)
        }
        return page
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.pageService.delete(id);
        if(!deletedDoc){
            throw new HttpException(PAGE_NOT_FOUND_ERROR, 404)
        }
        return { message: 'Готово' }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
        const updatedPage = await this.pageService.updateById(id, dto);
        if(!updatedPage){
            throw new HttpException(PAGE_NOT_FOUND_ERROR, 404)
        }
        return updatedPage
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindPageDto) {
        return this.pageService.find(dto.firstCategory)
    }
}
