import {
  ConfigurationTypeValidationResult,
  IConfigurationType,
} from "./IConfigurationType";

export default class ConfigTypeBoolean implements IConfigurationType {
  typeName: string = "boolean";

  validate(value: any): ConfigurationTypeValidationResult {
    if (value === "true" || value === "false" )
      return {
        success: true,
        value: value,
        message: "",
      };
    else
      return {
        success: false,
        value: value,
        message: "Value should be boolean",
      };
  }
}
