import { ProductionStrategy } from "./ProductionStrategy";
import { Factory } from "../entities/Factory";
import { InputResourceType } from "../enums/InputResourceType";

export class MoulinAGrainsProductionStrategy extends ProductionStrategy {
    getRequiredGoods(factory: Factory): InputResourceType[] {
        return factory.requiredGoods;
    }
}
