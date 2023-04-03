import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../user.model';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExporation: true,
			secretOrKey: configService.get('JWT_SECRET')
		});
	}

	async validate({ email }: Pick<UserModel, 'email'>) {
		return email;
	}
}
