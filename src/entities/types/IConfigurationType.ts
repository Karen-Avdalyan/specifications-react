export type ConfigurationTypeValidationResult = {
    success: boolean;
    value: any;
    message: string;
}

export interface IConfigurationType {
    typeName: string;
    validate(value: any): ConfigurationTypeValidationResult;
}
