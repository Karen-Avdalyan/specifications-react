import {ConfigurationTypeValidationResult, IConfigurationType} from "./IConfigurationType";

export default class ConfigTypePositiveInteger implements IConfigurationType {
    typeName: string = "p-integer";

    validate(value: any): ConfigurationTypeValidationResult {
        if (Number.isInteger(value) && parseInt(value) > 0)
            return {
                success: true,
                value: value,
                message: '',
            };
        else
            return {
                success: false,
                value: value,
                message: 'Value should be positive integer',
            }
    }
}
