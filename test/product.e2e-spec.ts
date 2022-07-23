import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose'
import { AuthDto } from '../src/auth/dto/auth.dto';
import { CreateProductDto } from '../src/product/dto/create-product.dto';

const loginDto: AuthDto = {
	login: 'b@gmail.com',
	password: '1'
}
const testDto: CreateProductDto = {
	image: 'string',
    titel: 'string',
    price: 100,
    oldPrice: 120,
    credit: 20,
    description: 'string',
    advantages: 'string',
    disAdvantages: 'string',
    categories: ['string'],
    tags: ['string'],
    characteristics: [{
		name: 'name',
		value: 'value'
	}]
}

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let id: string;
  let token: string;

    beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			token = body.access_token
    });

	it('/product/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/product/create')
            .set('Authorization', `Bearer ${token}`)
			.send(testDto)
			.expect(201)
            .then(({ body }: request.Response) => {
                id = body._id;
                expect(body).toBeDefined()
            })
	});

	it('/product/get (GET)', async () => {
		return request(app.getHttpServer())
			.get(`/product/${id}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	});

	it('/product/patch (PATCH)', async () => {
		return request(app.getHttpServer())
			.patch(`/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	});

	it('/product/delete (DELETE)', () => {
		return request(app.getHttpServer())
			.delete(`/product/${id}`)
            .set('Authorization', `Bearer ${token}`)
			.expect(200)
	});

	afterAll(() => {
		disconnect();
	});
})
