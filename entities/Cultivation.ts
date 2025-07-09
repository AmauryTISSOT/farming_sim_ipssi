import { MachineType } from "../enums/MachineType";

export type Cultivation = {
    name: string;
    yield: number;
    requiredMaterial: MachineType[];
};
