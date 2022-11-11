import { Input } from "@chakra-ui/react";
import { IConfigProps } from "..";

export const CustomInput = ({ configuration }: IConfigProps) => {
  return (
    <div>
      <div style={{ marginLeft: "10px" }}>{configuration.name}</div>
      <Input
        placeholder={configuration.name}
        onChange={(e) => {
          configuration.value = e.target.value;
        }}
      />
    </div>
  );
};
