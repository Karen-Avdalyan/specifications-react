import { SpecificationSerialized, ConfigurationUI } from "../entities/ui";
import { SpecificationController } from "../controller/specification";

export class SpecificationUIService {
  static specificationController: SpecificationController =
    new SpecificationController();

  getSpecifications(): SpecificationSerialized[] {
    return SpecificationUIService.specificationController.getSpecifications();
  }

  getSpecification(name: string): ConfigurationUI[] {
    return SpecificationUIService.specificationController.getSpecification(name);
  }

  getConfigurations(): ConfigurationUI[] {
    return SpecificationUIService.specificationController.getConfigurations();
  }

  createSpecification(configs: ConfigurationUI[]): SpecificationSerialized {
    const nameConfig = configs.find(c => c.name === "name");
    if (!nameConfig) {
      throw Error("Name Config not found");
    }

    return SpecificationUIService.specificationController.createSpecification(nameConfig.value, configs);
  }
}

