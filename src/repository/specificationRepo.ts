import { Specification } from "../entities/specification";

export class SpecificationRepo {
  specifications: Specification[] = [];

  add(specification: Specification): Specification {
    this.specifications.push(specification);
    return specification;
  }

  getAll(): Specification[] {
    return this.specifications;
  }

  find(name: string): Specification | undefined {
    return this.specifications.find((s) => s.name === name);
  }

  //Here should be logic to get Latest Specification based on which new one should be created
  getLatest(): Specification {
    // Logic can be anything
    return this.specifications[this.specifications.length - 1];
  }
}
