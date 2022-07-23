import {
    Post,
    Controller, 
    Body,
    Get,
    Param,
    Delete,
    Patch,
    HttpCode
} from '@nestjs/common';
import { PageModel } from './page.model'
import { FindPageDto } from './dto/find-page.dto'
import { IdValidationPipe } from '../pipes/id-validation-pipe';

@Controller('page')
export class PageController {

    @Post('create')
    async create(@Body() dto: Omit<PageModel ,'_id'>) {

    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {

    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
         
    }

    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, dto: PageModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindPageDto) {

    }
}
