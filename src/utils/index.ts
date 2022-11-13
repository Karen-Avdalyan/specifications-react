import { ConfigurationUI } from "../entities/ui";

export const isAnyEmpty = (configs: ConfigurationUI[]): boolean => {
  for (let config of configs)
    if (config.type !== "boolean" && (!config.name || !config.value)) {
      return true;
    }
  return false;
};

export const getNewConfig = (): ConfigurationUI => ({
  name: "",
  value: "",
  type: "",
  options: [],
});
