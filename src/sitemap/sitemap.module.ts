import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PageModule } from '../page/page.module';
import { SitemapController } from './sitemap.controller';

@Module({
	imports: [PageModule, ConfigModule],
	controllers: [SitemapController]
})
export class SitemapModule {}
