import { SpecificationSerialized } from "./ui";
import { IConfigurationInfo } from "./configuration";
import { IInfo } from "./interfaces";

export class Specification implements IInfo {
  name: string;
  configurations: IConfigurationInfo[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addConfigurationInfo(configInfo: IConfigurationInfo) {
    this.configurations.push(configInfo);
  }

  getInfo(): string {
    throw new Error("Method not implemented.");
  }

  serialize(): SpecificationSerialized {
    const specification: SpecificationSerialized = this.configurations.reduce(
      (sum, current) => {
        (sum as any)[current.name] = current.value;
        return sum;
      },
      { name: "" }
    );

    return specification;
  }
}
