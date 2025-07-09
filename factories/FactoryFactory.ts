import { Factory } from "../entities/Factory";
import { FactoryType } from "../enums/FactoryType";
import { InputResourceType } from "../enums/InputResourceType";
import { OutputResourceType } from "../enums/OutputResourceType";

let nextId = 1;

export class FactoryFactory {
    public static createFactory(type: FactoryType): Factory {
        const id = nextId++;

        switch (type) {
            case FactoryType.MOULIN_A_HUILE:
                return new Factory(
                    id,
                    type,
                    [
                        InputResourceType.TOURNESOL,
                        InputResourceType.OLIVE,
                        InputResourceType.CANOLA,
                        InputResourceType.RIZ,
                    ],
                    OutputResourceType.HUILE,
                    2
                );

            case FactoryType.SCIERIE:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.PEUPLIER],
                    OutputResourceType.PLANCHES,
                    2
                );

            case FactoryType.FABRIQUE_DE_WAGONS:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.PLANCHES],
                    OutputResourceType.WAGONS,
                    4
                );

            case FactoryType.USINE_DE_JOUETS:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.PLANCHES],
                    OutputResourceType.JOUETS,
                    3
                );

            case FactoryType.MOULIN_A_GRAINS:
                return new Factory(
                    id,
                    type,
                    [
                        InputResourceType.BLE,
                        InputResourceType.ORGE,
                        InputResourceType.SORGHO,
                    ],
                    OutputResourceType.FARINE,
                    2
                );

            case FactoryType.RAFFINERIE_DE_SUCRE:
                return new Factory(
                    id,
                    type,
                    [
                        InputResourceType.BETTERAVE,
                        InputResourceType.CANNE_A_SUCRE,
                    ],
                    OutputResourceType.SUCRE,
                    2
                );

            case FactoryType.FILATURE:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.COTON],
                    OutputResourceType.TISSU,
                    2
                );

            case FactoryType.ATELIER_DE_COUTURE:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.TISSU],
                    OutputResourceType.VETEMENTS,
                    2
                );

            case FactoryType.BOULANGERIE:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.SUCRE, InputResourceType.FARINE],
                    OutputResourceType.GATEAU,
                    6
                );

            case FactoryType.USINE_DE_CHIPS:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.POMME_DE_TERRE, InputResourceType.HUILE],
                    OutputResourceType.CHIPS,
                    6
                );

            case FactoryType.CAVE_A_VIN:
                return new Factory(
                    id,
                    type,
                    [InputResourceType.RAISIN],
                    OutputResourceType.VIN,
                    2
                );

            default:
                throw new Error(`Type d'usine inconnu : ${type}`);
        }
    }
}
