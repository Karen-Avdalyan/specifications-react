export class SpecificationCreationException {
    messages: string[];
    configNames: string[];
    values: any[];

    constructor(messages: string[], configNames: string[], values: any[]) {
        this.messages = messages;
        this.configNames = configNames;
        this.values = values;
    }
}
