import React from "react";
import { ConfigurationUI } from "../../entities/ui";
import { CustomCheckbox } from "./components/checkbox";
import { CustomInput } from "./components/input";
import { CustomSelect } from "./components/select";

type Components = {
  [key: string]: ({ configuration }: IConfigProps) => JSX.Element;
};

const components: Components = {
  string: CustomInput,
  boolean: CustomCheckbox,
  options: CustomSelect,
};

export interface IConfigProps {
  configuration: ConfigurationUI;
}

export const Configuration = ({ configuration }: IConfigProps) => {
  const Config = components[configuration.type];
  if (!Config) {
    return <div></div>
  }
  return (
    <div>
      <Config configuration={configuration} />
    </div>
  );
};
