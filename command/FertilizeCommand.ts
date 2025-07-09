// commands/FertilizeCommand.ts
import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { ACTION_DURATIONS } from "../constants/TimeConstants";

export class FertilizeCommand implements ICommand {
    constructor(private field: Field) {}

    async execute(): Promise<void> {
        console.log(`Fertilizing Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.FERTILIZE));
        this.field.increaseYield(1.5); // +50%
        this.field.nextCycle();
        console.log(`Field #${this.field.id} fertilized.`);
    }
}
