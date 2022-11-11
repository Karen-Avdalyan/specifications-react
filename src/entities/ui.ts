export interface SpecificationSerialized {
  name: string;
  [key: string]: string | boolean | string[];
}

export interface ConfigurationUI {
  name: string;
  value: string;
  type: string;
  options?: string[];
}
