import { Cultivation } from "../entities/Cultivation";
import { Field } from "../entities/Field";
import { MachineType } from "../enums/MachineType";
import { CultivationType } from "../enums/CultivationType";

export class FieldFactory {
    public static createField(id: number, type: CultivationType): Field {
        const fieldConfig: {
            [key in CultivationType]: Omit<Cultivation, "name">;
        } = {
            [CultivationType.BLE]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.ORGE]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.AVOINE]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.CANOLA]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.SOJA]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.RAISIN]: {
                yield: 1500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER_RAISIN,
                ],
            },
            [CultivationType.OLIVE]: {
                yield: 1500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_ARBRE,
                    MachineType.HARVESTER_OLIVE,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.POMME_DE_TERRE]: {
                yield: 5000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_PDT,
                    MachineType.HARVESTER_PDT,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.BETTERAVE]: {
                yield: 3500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER_BETTERAVE,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.COTTON]: {
                yield: 750,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_PDT,
                    MachineType.HARVESTER_COTON,
                    MachineType.SEMI_TRAILER,
                ],
            },
            [CultivationType.MAIS]: {
                yield: 3000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_PDT,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.TOURNESOL]: {
                yield: 3000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_PDT,
                    MachineType.HARVESTER,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.CANNE_A_SUCRE]: {
                yield: 5000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_CANNE,
                    MachineType.HARVESTER_CANNE,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.PEUPLIER]: {
                yield: 1500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_ARBRE,
                    MachineType.HARVESTER_ARBRE,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.LEGUMES]: {
                yield: 2500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER_LEGUMES,
                    MachineType.HARVESTER_LEGUMES,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.EPINARD]: {
                yield: 3000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER_EPINARD,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.POIS]: {
                yield: 7500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER_POIS,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.HARICOTS_VERTS]: {
                yield: 7500,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER_HARICOT,
                    MachineType.TRAILER,
                ],
            },
            [CultivationType.HERBES]: {
                yield: 5000,
                requiredMaterial: [
                    MachineType.TRACTOR,
                    MachineType.PLANTER,
                    MachineType.HARVESTER,
                ],
            },
            [CultivationType.CACAO]: {
                yield: 1000,
                requiredMaterial: [
                    MachineType.PLANTER_ARBRE,
                    MachineType.HARVESTER_ARBRE,
                ],
            },
            [CultivationType.SERRE]: {
                yield: 1500,
                requiredMaterial: [],
            },
        };

        const cultivation = fieldConfig[type];
        if (!cultivation) {
            throw new Error(`Unknown cultivation type: ${type}`);
        }

        return new Field(
            id,
            type,
            cultivation.yield,
            cultivation.requiredMaterial
        );
    }
}
