import { FieldState } from "../fieldState/FieldState";
import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { ISubject } from "../observers/ISubject";
import { HarvestState } from "../fieldState/HarvestState";
import { MachineType } from "../enums/MachineType";
import { CultivationType } from "../enums/CultivationType";
import { STORAGE_CONST } from "../constants/StorageConstants";

export class Field implements IObserver {
    public id: number;
    public type: CultivationType;
    public state!: FieldState;
    public yield: number;
    public cultivationMaterial: MachineType[];
    private stopped: boolean = false;
    public isSowed: boolean = false;
    public currentlyCultivated: boolean = false;

    constructor(
        id: number,
        type: CultivationType,
        yieldValue: number,
        cultivationMaterial: MachineType[]
    ) {
        this.id = id;
        this.type = type;
        this.yield = yieldValue;
        this.cultivationMaterial = cultivationMaterial;
        this.transitionTo(new HarvestState());
    }

    public transitionTo(state: FieldState): void {
        this.state = state;
        this.state.setField(this);
        console.log(
            `Field number ${this.id} state is now : ${state.getName()}`
        );
    }

    public nextCycle(): void {
        if (!this.stopped) {
            this.state.next();
        } else {
            console.log("Storage is full ! Production stopped");
        }
    }

    public getState(): string {
        return this.state.getName();
    }

    public update(subject: ISubject): void {
        if (
            subject instanceof Subject &&
            subject.state >= STORAGE_CONST.MAX_CAPACITY
        ) {
            console.log(
                `Field number ${this.id} - type ${this.type} : Max capacity reached - field production stopped`
            );
            this.stopped = true;
        } else {
            this.stopped = false;
        }
    }

    public setSowed(bool: boolean): void {
        this.isSowed = bool;
    }

    public increaseYield(increseValue: number) {
        this.yield = this.yield * increseValue;
    }
}
