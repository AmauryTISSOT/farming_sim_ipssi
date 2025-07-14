import { FieldState } from "./FieldState";
import { HarvestState } from "./HarvestState";

export class ReadyToHarvestState extends FieldState {
    getName(): string {
        return "Ready to harvest";
    }

    next(): void {
        console.log("Change state to Harvestedd");
        this.field.transitionTo(new HarvestState());
    }
}
