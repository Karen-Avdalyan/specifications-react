import {Configuration, IConfiguration } from "../entities/configuration";
import {IConfigurationType} from "../entities/types/IConfigurationType";
import configurationMapping, { defaultConfiguration, IConfigurationTypeMapping } from "../entities/configurationMapping";
import { NotFoundException } from "../exceptions/notFoundException";
import { ConfigurationUI } from "../entities/ui";

export class ConfigurationController {
    configurationTypeMapping: IConfigurationTypeMapping[] = configurationMapping;

    createConfiguration(name: string, type: IConfigurationType): IConfiguration {
        return new Configuration(name, type);
    }

    getConfigurationTypes(): string[] {
        return this.configurationTypeMapping.map(c => c.typeName);
    }

    getConfigurationType(type: string): IConfigurationType {
        const foundType = this.configurationTypeMapping.find(c => c.typeName === type);
        if (!foundType) {
            throw new NotFoundException(`${type} configuration type not found`, 'ConfigType');
        }
        return foundType.type;
    }

    getDefaultConfiguration(): ConfigurationUI[]  {
        return defaultConfiguration;
    }
}
