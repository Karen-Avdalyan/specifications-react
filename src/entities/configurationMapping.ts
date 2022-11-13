import ConfigTypeBoolean from "./types/ConfigTypeBoolean";
import ConfigTypeOptions from "./types/ConfigTypeOptions";
import ConfigTypeString from "./types/ConfigTypeString";
import { IConfigurationType } from "./types/IConfigurationType";
import { ConfigurationUI } from "./ui";

export interface IConfigurationTypeMapping {
  typeName: string;
  type: IConfigurationType;
}

const mapping: IConfigurationTypeMapping[] = [
  {
    typeName: "string",
    type: new ConfigTypeString(),
  },
  {
    typeName: "boolean",
    type: new ConfigTypeBoolean(),
  },
  {
    typeName: "options",
    type: new ConfigTypeOptions(),
  },
  // Add here all other types needed
];

export const defaultConfiguration: ConfigurationUI[] = [
  {
    name: "name",
    value: "",
    type: "string",
  },
  // Add here all other default configuratoins needed
];

export default mapping;
