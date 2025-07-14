import { FieldState } from "./FieldState";
import { SowState } from "./SowState";

export class PlowState extends FieldState {
    getName(): string {
        return "Plowed";
    }

    next(): void {
        console.log("Change state to Sow");
        this.field.transitionTo(new SowState());
    }
}
