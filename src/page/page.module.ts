import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JustjoinitModule } from 'src/justjoinit/justjoinit.module';
import { PageController } from './page.controller';
import { PageModel } from './page.model';
import { PageService } from './page.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PageModel,
				schemaOptions: {
					collection: 'Page'
				}
			}
		]),
		JustjoinitModule
	],
	controllers: [PageController],
	providers: [PageService],
	exports: [PageService, PageModule]
})
export class PageModule {}
