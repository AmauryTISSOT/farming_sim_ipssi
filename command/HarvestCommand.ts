import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { Goods } from "../entities/Goods";
import { FarmStorage } from "../entities/FarmStorage";
import { ACTION_DURATIONS } from "../constants/TimeConstants";
import { FieldRepository } from "../data/repositories/FieldRepository";

export class HarvestCommand implements ICommand {
    private fieldRepository: FieldRepository;
    constructor(private field: Field) {
        this.fieldRepository = new FieldRepository();
    }
    async execute(): Promise<void> {
        console.log(this.field.getState());
        if (this.field.getState() !== "Ready to harvest") {
            console.log(`Field #${this.field.id} is not ready to harvest.`);
            return;
        }

        console.log(`Harvesting Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.HARVEST));

        const product = new Goods(this.field.type, this.field.yield);
        FarmStorage.instance.addGoods(product);
        this.field.nextCycle(); // → Harvested
        this.fieldRepository.update(this.field.id, { state: "harvested" });
        console.log(`Field #${this.field.id} harvested.`);
        console.log(
            `Product ${product.name} - with quantity ${product.quantity} has been send to Storage`
        );
    }
}
