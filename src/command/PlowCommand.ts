import { ICommand } from "./ICommand";
import { Field } from "../entities/Field";
import { ACTION_DURATIONS } from "../constants/TimeConstants";
import { FieldRepository } from "../data/repositories/FieldRepository";

export class PlowCommand implements ICommand {
    private fieldRepository: FieldRepository;
    constructor(private field: Field) {
        this.fieldRepository = new FieldRepository();
    }

    async execute(): Promise<void> {
        console.log(`Plowing Field #${this.field.id}...`);
        await new Promise((res) => setTimeout(res, ACTION_DURATIONS.PLOW));
        this.field.nextCycle();
        this.fieldRepository.update(this.field.id, { state: "plowed" });
        console.log(`Field #${this.field.id} plowed.`);
    }
}
