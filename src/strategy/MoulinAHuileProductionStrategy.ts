import { ProductionStrategy } from "./ProductionStrategy";
import { Factory } from "../entities/Factory";
import { InputResourceType } from "../enums/InputResourceType";

export class MoulinAHuileProductionStrategy extends ProductionStrategy {
    getRequiredGoods(factory: Factory): InputResourceType[] {
        return factory.requiredGoods;
    }
}
