// commands/FertilizeCommand.ts
import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { ACTION_DURATIONS } from "../constants/TimeConstants";
import { FieldRepository } from "../data/repositories/FieldRepository";

export class FertilizeCommand implements ICommand {
    private fieldRepository: FieldRepository;
    constructor(private field: Field) {
        this.fieldRepository = new FieldRepository();
    }

    async execute(): Promise<void> {
        console.log(`Fertilizing Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.FERTILIZE));
        this.field.increaseYield(1.5); // +50%
        this.fieldRepository.update(this.field.id, { state: "fertilized" });
        this.field.nextCycle();
        console.log(`Field #${this.field.id} fertilized.`);
    }
}
