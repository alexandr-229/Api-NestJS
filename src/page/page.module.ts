import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageModel } from './page.model';
import { TypegooseModule } from 'nestjs-typegoose'
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
  providers: [PageService]
})
export class PageModule {}
