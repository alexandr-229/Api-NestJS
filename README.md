This API was written in NestJS, TypeScript, JavaScript, NodeJS and MongoDB. In the ".vscode" folder you can see basic VSCode config. All the API devided into small modules. "Auth" module performs an authorization function. You can uploads your files through which "Files" module. You can send Telegram messages through which "Telegram" module. You can get sitemap through which "Sitemap" module. Other modules perform mundane functions. If you want to test this API you can run "npm run test:e2e" command

To run the application:

	git clone https://github.com/alexandr-229/Api-NestJS.git

	cd Api-NestJS

	add ".env" file

	write into it:

		MONGO_LOGIN=<Datebase login>

		MONGO_PASSWORD=<Database password>

		MONGO_HOST=<Database password>

		MONGO_POST=<Database password>

		MONGO_AUTH_DB=<Database auth DB>

		JWT_SECRET=<Jwt secret>

		TELEGRAM_BOT_ID=<Telegram bot id>

		TELEGRAM_CHAT_ID=<Telegram chat id>
	
	docker-compose up -d

	npm run build

	npm run start
