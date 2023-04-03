import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { compare, hash, genSalt } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.const';
import { JwtService } from '@nestjs/jwt';
import { ILogin } from './login.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const password = await hash(dto.password, salt);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: password
		});
		await newUser.save();
		const { passwordHash, ...user } = newUser.toObject();
		return user;
	}

	async findUser(email: string): Promise<DocumentType<UserModel> | null> {
		const result = await this.userModel.findOne({ email }).exec();
		return result;
	}

	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);
		if(!user) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if(!isCorrectPassword) {
			throw new HttpException(WRONG_PASSWORD_ERROR, HttpStatus.UNAUTHORIZED);
		}
		return { email: user.email };
	}

	async login(email: string): Promise<ILogin> {
		const payload = { email };
		const access_token = await this.jwtService.signAsync(payload);
		return { access_token };
	}
}
