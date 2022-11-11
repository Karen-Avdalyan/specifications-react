import {ConfigurationTypeValidationResult, IConfigurationType} from "./IConfigurationType";

export default class ConfigTypeOptions implements IConfigurationType {
    typeName: string = "options";
    options: string[];

    constructor(options: string[] = []) {
        this.options = options;
    }

    setOptions(options: string[]) {
        this.options = options;
    }

    validate(value: any): ConfigurationTypeValidationResult {
        if (typeof value === 'string' && this.options.includes(value))
            return {
                success: true,
                value: value,
                message: '',
            };
        else
            return {
                success: false,
                value: value,
                message: 'Value should be among available options',
            }
    }
}
