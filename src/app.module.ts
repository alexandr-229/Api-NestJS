import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AuthModule,
    PageModule,
    ProductModule,
    ReviewModule
  ],
})
export class AppModule {}
