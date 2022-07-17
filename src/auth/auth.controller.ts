import { HttpCode, Post, Controller } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
    
    @Post('register')
    async register(dto: AuthDto) {

    }

    @HttpCode(200)
    @Post('login')
    async login(dto: AuthDto) {

    }
}
