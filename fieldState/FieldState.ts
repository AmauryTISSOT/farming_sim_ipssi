import { Field } from "../entities/Field";

export abstract class FieldState {
    protected field!: Field;

    public setField(field: Field): void {
        this.field = field;
    }

    abstract next(): void;
    abstract getName(): string;
}
