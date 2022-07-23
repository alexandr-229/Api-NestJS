import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose'
import { AuthDto } from '../src/auth/dto/auth.dto';
import { CreatePageDto } from '../src/page/dto/create-page.dto';

const loginDto: AuthDto = {
	login: 'b@gmail.com',
	password: '1'
}
const testDto: CreatePageDto = {
	firstLevelCategory: 1,
    secondCategory: 'string',
    title: 'string',
    alias: 'string',
    category: 'string',
    hh: {
			count: 1000,
			jniorSalary: 1000,
			middleSalary: 5000,
			seniorSalary: 10000
		},
    advantages: [{
			title: 'string',
			description: 'string'
		}],
    seoText: 'string',
    tagsTitle: 'string',
    tags: ['string']
}

describe('PageController (e2e)', () => {
  let app: INestApplication;
  let id: string;
  let token: string;
  let alias: string;
  let firstCategory: string;

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

	it('/page/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/page/create')
            .set('Authorization', `Bearer ${token}`)
			.send(testDto)
			.expect(201)
            .then(({ body }: request.Response) => {
                alias = body.alias;
                id = body._id;
                firstCategory = body.firstCategory;
                expect(body).toBeDefined()
            })
	});

	it('/page/get (GET)', async () => {
		return request(app.getHttpServer())
			.get(`/page/${id}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	});

	it('/page/byAlias/get (GET)', async () => {
		return request(app.getHttpServer())
			.get(`/page/byAlias/${alias}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	});

	it('/page/find (POST)', async () => {
		return request(app.getHttpServer())
			.post(`/page/find`)
            .send({ firstCategory })
			.expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined()
            })
	});

    it('/page/patch (PATCH)', async () => {
		return request(app.getHttpServer())
			.patch(`/page/${id}`)
            .set('Authorization', `Bearer ${token}`)
			.expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined()
            })
	});

    it('/page/delete (DELETE)', () => {
		return request(app.getHttpServer())
			.delete(`/page/${id}`)
            .set('Authorization', `Bearer ${token}`)
			.expect(200, {
                message: 'Готово'
            })
            
	});

	afterAll(() => {
		disconnect();
	});
})
