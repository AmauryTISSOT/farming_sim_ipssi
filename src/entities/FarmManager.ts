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
import { Prisma } from "@prisma/client";
import { FieldRepository } from "../data/repositories/FieldRepository";
import { FactoryRepository } from "../data/repositories/FactoryRepository";
import { MachineRepository } from "../data/repositories/MachineRepository";

export class FarmManager {
    public fields: Field[] = [];
    private machinesHangar: Machine[] = [];
    private factories: Factory[] = [];
    private maxFields: number = 100;
    private fieldIdCounter: number = 1;
    public farmStorage: FarmStorage = FarmStorage.instance;

    private fieldRepository: FieldRepository;
    private factoryRepository: FactoryRepository;
    private machineRepository: MachineRepository;

    constructor() {
        this.fieldRepository = new FieldRepository();
        this.factoryRepository = new FactoryRepository();
        this.machineRepository = new MachineRepository();
    }

    public async createField(type: CultivationType): Promise<Field | null> {
        if (this.fields.length < this.maxFields) {
            const field = FieldFactory.createField(this.fieldIdCounter++, type);
            FarmStorage.instance.attachObserver(field);
            this.fields.push(field);
            const prismaField = this.mapToPrismaField(field);
            await this.fieldRepository.create(prismaField);
            return field;
        } else {
            console.log("Max field capacity reached !");
            return null;
        }
    }

    public async createMachine(): Promise<void> {
        this.machinesHangar = await MachineFactory.createMachines();
    }

    public async createFactory(type: FactoryType): Promise<Factory> {
        const factory = FactoryFactory.createFactory(type);
        FarmStorage.instance.attachObserver(factory);
        this.factories.push(factory);
        const prismaField = this.mapToPrismaFactory(factory);
        await this.factoryRepository.create(prismaField);
        return factory;
    }

    public async sendMachineToField(): Promise<void> {
        for (const currentField of this.fields) {
            if (!currentField.isSowed) {
                for (const machineTypeRequired of currentField.cultivationMaterial) {
                    for (const machine of this.machinesHangar) {
                        if (
                            machine.type === machineTypeRequired &&
                            !machine.onTheField &&
                            !currentField.currentlyCultivated
                        ) {
                            machine.onTheField = true;
                            await this.machineRepository.update(machine.id, {
                                onTheField: true,
                            });
                            currentField.currentlyCultivated = true;
                            await this.fieldRepository.update(currentField.id, {
                                currentlyCultivated: true,
                            });
                            console.log(
                                `Machine number ${machine.id} - ${machine.type} has been sent to field ${currentField.id} - ${currentField.type}`
                            );
                        }
                    }
                }
            }
        }
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

    private mapToPrismaField(field: Field): Prisma.FieldCreateInput {
        return {
            id: field.id,
            type: field.type,
            state: "harvested",
            yield: field.yield,
            machineType: field.cultivationMaterial,
            stopped: false,
            isSowed: field.isSowed,
            currentlyCultivated: field.currentlyCultivated,
        };
    }

    private mapToPrismaFactory(factory: Factory): Prisma.FactoryCreateInput {
        return {
            id: factory.id,
            type: factory.type,
            requiredGoods: factory.requiredGoods,
            result: factory.result,
            multiplier: factory.multiplier,
            stopped: factory.stopped,
        };
    }
}
