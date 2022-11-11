export class ConfigurationValueSetException {
    message: string;
    configName: string;
    value: any;

    constructor(message: string, configName: string, value: any) {
        this.message = message;
        this.configName = configName;
        this.value = value;
    }
}
