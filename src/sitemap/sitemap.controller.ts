import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageService } from 'src/page/page.service';
import { format, subDays } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.const';

@Controller('sitemap')
export class SitemapController {
	domain: string;

	constructor(
		private readonly pageService: PageService,
		private readonly configService: ConfigService
	) {
		this.domain = this.configService.get('DOMAIN') ?? '';
	}

	@Get('xml')
	@Header('Content-Type', 'text/xml')
	async sitemap() {
		const formatString = 'yyyy-MM-dd\'T\'HH:mm:00.000.xxx';
		const result = [
			{
				loc: this.domain,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefrew: 'daily',
				priority: '1.0'
			},
			{
				loc: `${this.domain}/courses`,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefrew: 'daily',
				priority: '1.0'
			}
		];
		const pages = await this.pageService.findAll();
		pages.forEach((page) => {
			result.push(
				{
					loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
					lastmod: format(new Date(page.updatedAt ?? new Date()), formatString),
					changefrew: 'weekly',
					priority: '0.7'
				}
			);
		});
		const builder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' }
		});
		return builder.buildObject({
			urlset: {
				$: {
					xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
				},
				url: result
			}
		});
	}
}
