import {ConfigurationTypeValidationResult, IConfigurationType} from "./IConfigurationType";

export default class ConfigTypeInteger implements IConfigurationType {
    typeName: string = "integer";

    validate(value: string): ConfigurationTypeValidationResult {
        if (Number.isInteger(value))
            return {
                success: true,
                value: value,
                message: '',
            };
        else
            return {
                success: false,
                value: value,
                message: 'Value should be integer',
            }
    }
}
