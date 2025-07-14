import { MachineType } from "../enums/MachineType";

export class Machine {
    public id: number;
    public type: MachineType;
    public onTheField: boolean = false;

    constructor(id: number, type: MachineType) {
        this.id = id;
        this.type = type;
    }
}
