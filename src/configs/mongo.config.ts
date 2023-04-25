import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => ({
	uri: getMongoUri(configService),
	...getMongoOptions()
});

const getMongoUri = (configService: ConfigService): string => {
	const MONGO_LOGIN = configService.get('MONGO_LOGIN');
	const MONGO_PASSWORD = configService.get('MONGO_PASSWORD');
	const MONGO_SERVER = configService.get('MONGO_SERVER');
	const MONGO_AUTH_DB = configService.get('MONGO_AUTH_DB');
	if(!MONGO_LOGIN) {
		throw new Error('You need to set MONGO_AUTH_DB');
	}
	if(!MONGO_PASSWORD) {
		throw new Error('You need to set MONGO_PASSWORD');
	}
	if(!MONGO_SERVER) {
		throw new Error('You need to set MONGO_SERVER');
	}
	if(!MONGO_AUTH_DB) {
		throw new Error('You need to set MONGO_AUTH_DB');
	}
	const uri = `mongodb+srv://${MONGO_LOGIN}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_AUTH_DB}`;
	return uri;
};

const getMongoOptions = () => ({
	useUnifiedTopology: true
});