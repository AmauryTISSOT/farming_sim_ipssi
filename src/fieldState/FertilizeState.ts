import { FieldState } from "./FieldState";
import { ReadyToHarvestState } from "./ReadyToHarvestState";

export class FertilizeState extends FieldState {
    getName(): string {
        return "Fertilized";
    }

    next(): void {
        console.log("Change state to ReadyToHarvest");
        this.field.transitionTo(new ReadyToHarvestState());
    }
}
