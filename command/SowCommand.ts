// commands/SowCommand.ts
import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { ACTION_DURATIONS } from "../constants/TimeConstants";

export class SowCommand implements ICommand {
    constructor(private field: Field) {}

    async execute(): Promise<void> {
        console.log(`Sowing Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.SOW));
        this.field.setSowed(true);
        this.field.nextCycle();
        this.startGrowthTimer();
        console.log(`Field #${this.field.id} sowed.`);
    }

    private startGrowthTimer(): void {
        console.log(`Field #${this.field.id} growing (2min)...`);
        setTimeout(() => {
            this.field.nextCycle();
        }, ACTION_DURATIONS.GROWTH_TIME); // 2 min
    }
}
