import { FieldState } from "./FieldState";
import { PlowState } from "./PlowState";

export class HarvestState extends FieldState {
    getName(): string {
        return "Harvested";
    }
    next(): void {
        console.log("Change state to Plow");
        this.field.transitionTo(new PlowState());
    }
}
