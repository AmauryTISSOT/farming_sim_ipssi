import { MachineType } from "../enums/MachineType";
import { Machine } from "../entities/Machine";

export class MachineFactory {
    private static idCounter = 1;

    public static createMachines(): Machine[] {
        const machines: Machine[] = [];

        machines.push(...this.generateMachineBatch(MachineType.TRACTOR, 5));
        machines.push(...this.generateMachineBatch(MachineType.TRAILER, 3));
        machines.push(...this.generateMachineBatch(MachineType.HARVESTER, 2));
        machines.push(...this.generateMachineBatch(MachineType.PLOW, 2));
        machines.push(...this.generateMachineBatch(MachineType.FERTILIZER, 2));
        machines.push(...this.generateMachineBatch(MachineType.PLANTER, 2));

        const specializedTypes: MachineType[] = [
            MachineType.HARVESTER_RAISIN,
            MachineType.HARVESTER_OLIVE,
            MachineType.HARVESTER_PDT,
            MachineType.HARVESTER_BETTERAVE,
            MachineType.HARVESTER_COTON,
            MachineType.HARVESTER_CANNE,
            MachineType.HARVESTER_ARBRE,
            MachineType.HARVESTER_EPINARD,
            MachineType.HARVESTER_HARICOT,
            MachineType.HARVESTER_POIS,
            MachineType.HARVESTER_LEGUMES,
            MachineType.PLANTER_ARBRE,
            MachineType.PLANTER_PDT,
            MachineType.PLANTER_CANNE,
            MachineType.PLANTER_LEGUMES,
            MachineType.SEMI_TRAILER,
        ];

        for (const type of specializedTypes) {
            machines.push(new Machine(this.nextId(), type));
        }

        return machines;
    }

    private static generateMachineBatch(
        type: MachineType,
        quantity: number
    ): Machine[] {
        const list: Machine[] = [];
        for (let i = 0; i < quantity; i++) {
            list.push(new Machine(this.nextId(), type));
        }
        return list;
    }

    private static nextId(): number {
        return this.idCounter++;
    }
}
