import { Configuration, IConfiguration } from "../entities/configuration";
import { Specification } from "../entities/specification";
import { SpecificationRepo } from "../repository/specificationRepo";
import { ConfigurationUI, SpecificationSerialized } from "../entities/ui";
import { ConfigurationValueSetException } from "../exceptions/configurationValueSetException";
import { SpecificationCreationException } from "../exceptions/specificationCreationException";
import { ConfigurationController } from "../controller/configuration";
import { NotFoundException } from "../exceptions/notFoundException";
import ConfigTypeOptions from "../entities/types/ConfigTypeOptions";

export class SpecificationController {
  repo: SpecificationRepo = new SpecificationRepo();
  configController: ConfigurationController = new ConfigurationController();

  createSpecification(
    name: string,
    configs: ConfigurationUI[]
  ): SpecificationSerialized {
    const specification = new Specification(name);
    const validationFailures: ConfigurationValueSetException[] = [];
    const configurations = configs.map((c) => this.uiToConfiguration(c));

    configurations.forEach((config) => {
      try {
        specification.addConfigurationInfo(config.serialize());
      } catch (e) {
        if (e instanceof ConfigurationValueSetException) {
          validationFailures.push(e);
        }
      }
    });
    if (validationFailures.length) {
      throw new SpecificationCreationException(
        validationFailures.map((failure) => failure.message),
        validationFailures.map((failure) => failure.configName),
        validationFailures.map((failure) => failure.value)
      );
    }
    return this.repo.add(specification).serialize();
  }

  getSpecifications(): SpecificationSerialized[] {
    const specifications = this.repo.getAll();
    return specifications.map((specification) => specification.serialize());
  }

  getConfigurations(): ConfigurationUI[] {
    const configs = this.repo.getLatest();
    if (!configs) {
      return [
        {
          name: "name",
          value: "",
          type: "string",
        },
      ];
    }

    return this.repo.getLatest().configurations.map((c) => ({
      ...c,
      value: "",
      type: c.typeName,
    }));
  }

  getSpecification(name: string): ConfigurationUI[] {
    const specification = this.repo.find(name);
    if (!specification) {
      throw new NotFoundException(
        `Specification not found: name = ${name}`,
        "Specification"
      );
    }
    return specification.configurations.map((c) => ({
      ...c,
      type: c.typeName,
    }));
  }

  private uiToConfiguration(config: ConfigurationUI): IConfiguration {
    const type = this.configController.getConfigurationType(config.type);
    if (config.options && config.options.length > 0) {
      (type as ConfigTypeOptions).setOptions(config.options);
    }

    const newConfig = new Configuration(config.name, type);
    newConfig.setValue(config.value);
    return newConfig;
  }
}
