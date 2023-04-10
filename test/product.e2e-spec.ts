import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { PRODUCT_NOT_FOUND } from '../src/product/product.const';
import { FindProductDto } from '../src/product/dto/find.product.dto';
import { CreateProductDto } from '../src/product/dto/create.product.dto';
import * as request from 'supertest';

const productDto: CreateProductDto = {
	image: 'image',
	title: 'title',
	price: 100,
	oldPrice: 120,
	credit: 20,
	description: 'description',
	advatanges: 'advatanges',
	disAdvatanges: 'disAdvatanges',
	categories: [ 'category' ],
	tags: [ 'tag' ],
	characteristics: [
		{
			name: 'name',
			value: 'value'
		}
	]
};

const findProductDto: FindProductDto = {
	category: productDto.categories[0],
	limit: 1
};

describe('Product (e2e)', () => {
	let app: INestApplication;
	let productId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/product/create (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/product/create')
			.send(productDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				productId = body._id;
				expect(body.title).toBe(productDto.title);
			});
	});

	it('/product/create (POST) fail', async () => {
		return request(app.getHttpServer())
			.post('/product/create')
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('/product/:id (GET) success', async () => {
		return request(app.getHttpServer())
			.get(`/product/${productId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
			});
	});

	it('/product/:id (GET) fail', async () => {
		return request(app.getHttpServer())
			.get(`/product/${new Types.ObjectId().toHexString()}`)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PRODUCT_NOT_FOUND);
			});
	});

	it('/product/:id (PATCH) success', async () => {
		return request(app.getHttpServer())
			.patch(`/product/${productId}`)
			.send({ ...productDto, title: 'title1' })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.title).toBe('title1');
			});
	});

	it('/product/:id (PATCH) fail NOT_FOUND', async () => {
		return request(app.getHttpServer())
			.patch(`/product/${new Types.ObjectId().toHexString()}`)
			.send({ ...productDto, title: 'title1' })
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PRODUCT_NOT_FOUND);
			});
	});

	it('/product/:id (PATCH) fail BAD_REQUEST', async () => {
		return request(app.getHttpServer())
			.patch(`/product/${productId}`)
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('/product/find (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/product/find')
			.send(findProductDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				const product = body.find((p: CreateProductDto & { _id: string }) => p._id.toString() === productId.toString());
				expect(product.reviews).toBeDefined();
			});
	});

	it('/product/find (POST) fail', async () => {
		return request(app.getHttpServer())
			.post('/product/find')
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
			});
	});

	it('/product/:id (DELETE) success', () => {
		return request(app.getHttpServer())
			.delete(`/product/${productId}`)
			.expect(200);
	});

	it('/product/:id (DELETE) fail', async () => {
		return request(app.getHttpServer())
			.delete(`/product/${new Types.ObjectId().toHexString()}`)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PRODUCT_NOT_FOUND);
			});
	});

	afterAll(() => {
		disconnect();
	});
});
