import { FertilizeState } from "./FertilizeState";
import { FieldState } from "./FieldState";

export class SowState extends FieldState {
    getName(): string {
        return "Sowed";
    }

    next(): void {
        console.log("Change state to Fertilize");
        this.field.transitionTo(new FertilizeState());
    }
}
