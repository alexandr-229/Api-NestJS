import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageController } from './page.controller';
import { PageModel } from './page.model';
import { PageService } from './page.service';

@Module({
	imports: [TypegooseModule.forFeature([
		{
			typegooseClass: PageModel,
			schemaOptions: {
				collection: 'Page'
			}
		}
	])],
	controllers: [PageController],
	providers: [PageService],
	exports: [PageService]
})
export class PageModule {}
