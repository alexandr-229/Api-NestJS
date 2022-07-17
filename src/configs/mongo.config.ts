import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        useUnifiedTopology: true,
    }
};

const getMongoString = (configService: ConfigService) => {
    return configService.get('LINK_TO_DB');
};