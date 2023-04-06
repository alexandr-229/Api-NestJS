import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file.response.element';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
	async saveFiles(
		files: MFile[],
	): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const result: FileElementResponse[] = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			result.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
		}
		return result;
	}

	async convertToWebp(file: Buffer): Promise<Buffer> {
		const result = await sharp(file)
			.webp()
			.toBuffer();
		return result;
	}
}
