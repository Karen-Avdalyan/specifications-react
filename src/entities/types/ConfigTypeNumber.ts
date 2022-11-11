import {ConfigurationTypeValidationResult, IConfigurationType} from "./IConfigurationType";

export default class ConfigTypeNumber implements IConfigurationType {
    typeName: string = "number";

    validate(value: string): ConfigurationTypeValidationResult {
        if (Number.isFinite(value))
            return {
                success: true,
                value: value,
                message: '',
            };
        else
            return {
                success: false,
                value: value,
                message: 'Value should be numeric',
            }
    }
}
