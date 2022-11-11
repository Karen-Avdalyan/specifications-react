import { Select } from "@chakra-ui/react";
import { IConfigProps } from "..";

export const CustomSelect = ({ configuration }: IConfigProps) => {
  return (
    <div>
      <div style={{ marginLeft: "10px" }}>{configuration.name}</div>
      <Select
        placeholder={"Choose " + configuration.name}
        onChange={(e) => (configuration.value = e.target.value)}
      >
        {configuration.options &&
          configuration.options.map((x) => <option value={x}>{x}</option>)}
      </Select>
    </div>
  );
};
