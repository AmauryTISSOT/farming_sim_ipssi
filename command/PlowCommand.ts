import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { ACTION_DURATIONS } from "../constants/TimeConstants";

export class PlowCommand implements ICommand {
    constructor(private field: Field) {}

    async execute(): Promise<void> {
        console.log(`Plowing Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.PLOW));
        this.field.nextCycle();
        console.log(`Field #${this.field.id} plowed.`);
    }
}
