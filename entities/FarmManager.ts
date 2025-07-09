import { Factory } from "./Factory";
import { Storage } from "./Storage";
import { Field } from "./Field";
import { Machine } from "./Machine";
import { FieldFactory } from "../factories/FieldFactory";
import { FactoryFactory } from "../factories/FactoryFactory";
import { MachineFactory } from "../factories/MachineFactory";
import { CultivationType } from "../enums/CultivationType";
import { FactoryType } from "../enums/FactoryType";

export class FarmManager {
    public fields: Field[] = [];
    private machines: Machine[] = [];
    private factories: Factory[] = [];
    private maxFields: number = 100;
    public storage: Storage = Storage.instance;

    constructor() {}

    public createField(id: number, type: CultivationType): Field | null {
        if (this.fields.length < this.maxFields) {
            const field = FieldFactory.createField(id, type);
            Storage.instance.attachObserver(field);
            this.fields.push(field);
            return field;
        } else {
            console.log("Max field capacity reached !");
            return null;
        }
    }

    public createMachine(): void {
        this.machines = MachineFactory.createMachines();
    }

    public createFactory(type: FactoryType): Factory {
        const factory = FactoryFactory.createFactory(type);
        Storage.instance.attachObserver(factory);
        this.factories.push(factory);
        return factory;
    }

    public report(): void {
        console.log(`Fields : ${this.fields.length}`);
        console.log(`Machines : ${this.machines.length}`);
        console.log(`Factories : ${this.factories.length}`);
        console.log(`Storage : ${this.storage.stock.size}`);
    }
}
