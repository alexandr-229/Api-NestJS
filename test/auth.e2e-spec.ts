import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from '../src/auth/auth.const';

const loginDto: AuthDto = {
	login: 'a@gmail.com',
	password: 'passrfvrfvrfvword'
};

describe('Auth (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) fail (USER NOT FOUND)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'b@gmail.com' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(USER_NOT_FOUND);
			});
	});

	it('/auth/login (POST) fail (WRONG PASSWORD)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '2' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(WRONG_PASSWORD_ERROR);
			});
	});

	afterAll(() => {
		disconnect();
	});
});