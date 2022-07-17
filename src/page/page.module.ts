import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageModel } from './page.model';
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [TypegooseModule.forFeature([
    {
      typegooseClass: PageModel,
      schemaOptions: {
        collection: 'Review'
      }
    }
  ])],
  controllers: [PageController]
})
export class PageModule {}
