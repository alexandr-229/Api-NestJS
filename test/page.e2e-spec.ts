import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types, disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { CreatePageDto } from '../src/page/dto/create.page.dto';
import { FindPageDto } from '../src/page/dto/find.page.dto';
import { PAGE_NOT_FOUND } from '../src/page/page.const';
import * as request from 'supertest';

const pageDto: CreatePageDto = {
	firstCategory: 0,
	secondCategory: 'secondCategory',
	alias: 'alias',
	title: 'title',
	category: 'category',
	justjoinit: {
		count: 5000,
		juniorSalary: 1000,
		middleSalary: 3000,
		seniorSalary: 10000,
		updatedAt: new Date()
	},
	advatanges: [
		{
			title: 'title',
			description: 'description'
		}
	],
	seoText: 'seoText',
	tagsTitle: 'tagsTitle',
	tags: [ 'tag' ]
};

const findPage: FindPageDto = {
	firstCategory: pageDto.firstCategory
};

describe('Page (e2e)', () => {
	let app: INestApplication;
	let pageId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/page/create (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/page/create')
			.send(pageDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				pageId = body._id;
				expect(pageId).toBeDefined();
			});
	});

	it('/page/create (POST) fail', async () => {
		return request(app.getHttpServer())
			.post('/page/create')
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('/page/:id (GET) success', async () => {
		return request(app.getHttpServer())
			.get(`/page/${pageId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(pageId);
			});
	});

	it('/page/:id (GET) fail', async () => {
		return request(app.getHttpServer())
			.get(`/page/${new Types.ObjectId().toHexString()}`)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PAGE_NOT_FOUND);
			});
	});

	it('/page/:id (PATCH) success', async () => {
		return request(app.getHttpServer())
			.patch(`/page/${pageId}`)
			.send({ ...pageDto, title: 'title1' })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.title).toBe('title1');
			});
	});

	it('/page/:id (PATCH) fail BAD_REQUEST', async () => {
		return request(app.getHttpServer())
			.patch(`/page/${pageId}`)
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('/page/:id (PATCH) fail NOT_FOUND', async () => {
		return request(app.getHttpServer())
			.patch(`/page/${new Types.ObjectId().toHexString()}`)
			.send({ ...pageDto, title: 'title1' })
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PAGE_NOT_FOUND);
			});
	});

	it('/page/find (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/page/find')
			.send(findPage)
			.expect(200)
			.then(({ body }: request.Response) => {
				const page = body.find(({ _id: { secondCategory } }: { _id: { secondCategory: string } }) => {
					return secondCategory === pageDto.secondCategory;
				});
				expect(page).toBeDefined();
			});
	});

	it('/page/find (POST) fail', async () => {
		return request(app.getHttpServer())
			.post('/page/find')
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('textSearch/:text (GET) success', async () => {
		return request(app.getHttpServer())
			.get(`/page/textSearch/${pageDto.title}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(!!body.length).toBe(true);
			});
	});

	it('/page/:id (DELETE) success', () => {
		return request(app.getHttpServer())
			.delete(`/page/${pageId}`)
			.expect(200);
	});

	it('/page/:id (DELETE) fail', async () => {
		return request(app.getHttpServer())
			.delete(`/page/${new Types.ObjectId().toHexString()}`)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PAGE_NOT_FOUND);
			});
	});

	afterAll(() => {
		disconnect();
	});
});
