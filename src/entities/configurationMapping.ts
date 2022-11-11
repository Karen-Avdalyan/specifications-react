import ConfigTypeBoolean from "./types/ConfigTypeBoolean";
import ConfigTypeOptions from "./types/ConfigTypeOptions";
import ConfigTypeString from "./types/ConfigTypeString";
import { IConfigurationType } from "./types/IConfigurationType";

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

export default mapping;
