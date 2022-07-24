import {
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-response-element.response'
import { FilesService } from './files.service';
import { MFile } from './mfile-class';

@Controller('files')
export class FilesController {

    constructor(
        private readonly fileService: FilesService
    ) { }

    @HttpCode(200)
    @Post('upload')
    @UseGuards()
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
        const saveArray: MFile[] = [file]
        if(file.mimetype.includes('image')){
            const buffer = await this.fileService.convertToWebP(file.buffer)
            saveArray.push(
                new MFile({
                    originalname: `${file.originalname.split('.')[0]}.webp`,
                    buffer
                }) 
            )
        }
        return this.fileService.saveFiles(saveArray)
    }
}
