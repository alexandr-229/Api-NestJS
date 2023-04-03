import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from './auth.const';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);
		if(oldUser) {
			throw new HttpException(ALREADY_REGISTERED_ERROR, HttpStatus.BAD_REQUEST);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);
		const result = await this.authService.login(email);
		return result;
	}
}
