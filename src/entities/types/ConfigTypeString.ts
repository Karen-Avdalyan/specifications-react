import {ConfigurationTypeValidationResult, IConfigurationType} from "./IConfigurationType";

export default class ConfigTypeString implements IConfigurationType {
    typeName: string = "string";
    
    validate(value: any): ConfigurationTypeValidationResult {
        if (typeof value === 'string')
            return {
                success: true,
                value: value,
                message: '',
            };
        else
            return {
                success: false,
                value: value,
                message: 'Value should be string',
            };
    }
}
