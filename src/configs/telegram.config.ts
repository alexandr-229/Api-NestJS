import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_BOT_ID');
	const chatId = configService.get('TELEGRAM_CHAT_ID');
	if(!token) {
		throw new Error('You need to set TELEGRAM_BOT_ID');
	}
	return {
		token,
		chatId: chatId ?? ''
	};
};
