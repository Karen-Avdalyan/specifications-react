import { Checkbox } from "@chakra-ui/react";
import { IConfigProps } from "..";

export const CustomCheckbox = ({ configuration }: IConfigProps) => {
  return (
    <label style={{ display: "flex", columnGap: 5 }}>
      <Checkbox
        onChange={() => (configuration.value = !configuration.value + "")}
      />
      <span>{configuration.name}</span>
    </label>
  );
};
