import { Factory } from "./Factory";
import { FarmStorage } from "./FarmStorage";
import { Field } from "./Field";
import { Machine } from "./Machine";
import { FieldFactory } from "../factories/FieldFactory";
import { FactoryFactory } from "../factories/FactoryFactory";
import { MachineFactory } from "../factories/MachineFactory";
import { CultivationType } from "../enums/CultivationType";
import { FactoryType } from "../enums/FactoryType";
import { MachineInvoker } from "../command/MachineInvoker";
import { PlowCommand } from "../command/PlowCommand";
import { SowCommand } from "../command/SowCommand";
import { FertilizeCommand } from "../command/FertilizeCommand";
import { HarvestCommand } from "../command/HarvestCommand";

export class FarmManager {
    public fields: Field[] = [];
    private machinesHangar: Machine[] = [];
    private factories: Factory[] = [];
    private maxFields: number = 100;
    private fieldIdCounter: number = 1;
    public farmStorage: FarmStorage = FarmStorage.instance;

    constructor() {}

    public createField(type: CultivationType): Field | null {
        if (this.fields.length < this.maxFields) {
            const field = FieldFactory.createField(this.fieldIdCounter++, type);
            FarmStorage.instance.attachObserver(field);
            this.fields.push(field);
            return field;
        } else {
            console.log("Max field capacity reached !");
            return null;
        }
    }

    public createMachine(): void {
        this.machinesHangar = MachineFactory.createMachines();
    }

    public createFactory(type: FactoryType): Factory {
        const factory = FactoryFactory.createFactory(type);
        FarmStorage.instance.attachObserver(factory);
        this.factories.push(factory);
        return factory;
    }

    public async sendMachineToField(): Promise<void> {
        let i = 0;
        this.fields.forEach((currentField) => {
            if (!currentField.isSowed) {
                for (const machineTypeRequired of currentField.cultivationMaterial) {
                    for (const machine of this.machinesHangar) {
                        if (
                            machine.type === machineTypeRequired &&
                            !machine.onTheField &&
                            !currentField.currentlyCultivated
                        ) {
                            machine.onTheField = true;
                            currentField.currentlyCultivated = true;
                            console.log(
                                `Machine number ${machine.id} - ${machine.type} has been sent to field ${currentField.id} - ${currentField.type}`
                            );
                        }
                    }
                }
            }
        });
    }

    public async startAllCultivation(): Promise<void> {
        const promises = this.fields
            .filter((f) => f.currentlyCultivated)
            .map((field) => this.startCultivationCycle(field));

        await Promise.all(promises);
        await this.startProductionCycle();
    }

    private async startCultivationCycle(field: Field): Promise<void> {
        console.log(`Invoker : field ${field.id}`);
        const invoker = new MachineInvoker();
        invoker.addCommand(new PlowCommand(field));
        invoker.addCommand(new SowCommand(field));
        invoker.addCommand(new FertilizeCommand(field));
        invoker.addCommand(new HarvestCommand(field));

        await invoker.executeAll();
        this.farmStorage.printStock();
    }

    public report(): void {
        console.log(`Fields : ${this.fields.length}`);
        console.log(`Machines : ${this.machinesHangar.length}`);
        console.log(`Factories : ${this.factories.length}`);
        console.log(`Storage : ${this.farmStorage.stock.size}`);
    }

    public async startProductionCycle(): Promise<void> {
        console.log("Start Production Cycle");

        let productionHappened: boolean;

        do {
            productionHappened = false;

            for (const factory of this.factories) {
                if (factory.canProduce(this.farmStorage)) {
                    await factory.produce(this.farmStorage);
                    productionHappened = true;
                }
            }
        } while (productionHappened);
        this.farmStorage.printStock();
    }
}
