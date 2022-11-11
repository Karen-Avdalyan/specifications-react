import { ConfigurationController } from "../controller/configuration";

export class ConfigurationUIService {
    controller: ConfigurationController = new ConfigurationController();

    getConfigurationTypes(): string[] {
        return this.controller.getConfigurationTypes();
    }
}
