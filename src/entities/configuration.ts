import {
  ConfigurationTypeValidationResult,
  IConfigurationType,
} from "./types/IConfigurationType";
import { ConfigurationValueSetException } from "../exceptions/configurationValueSetException";
import ConfigTypeOptions from "./types/ConfigTypeOptions";

export interface IConfigurationInfo {
  name: string;
  value: any;
  typeName: string;
  options?: string[];
}

export interface IConfiguration {
  name: string;
  value: any;
  type: IConfigurationType;
  serialize(): IConfigurationInfo;
  setValue(value: any): any;
}

export class Configuration implements IConfiguration {
  name: string;
  type: IConfigurationType;
  value: any;

  constructor(name: string, type: IConfigurationType) {
    this.name = name;
    this.type = type;
    this.value = undefined;
  }

  setValue(value: any): any {
    this.value = this.validateValue(value);
    return this.value;
  }

  validateValue(value: any): any {
    let res: ConfigurationTypeValidationResult = this.type.validate(value);
    if (res.success) return res.value;
    throw new ConfigurationValueSetException(res.message, this.name, value);
  }

  serialize(): IConfigurationInfo {
    this.validateValue(this.value);
    if (this.type.typeName === "options") {
      return {
        name: this.name,
        value: this.value,
        typeName: this.type.typeName,
        options: (this.type as ConfigTypeOptions).options,
      };
    }

    return {
      name: this.name,
      value: this.value,
      typeName: this.type.typeName,
    };
  }
}
