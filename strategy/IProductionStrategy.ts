import { Factory } from "../entities/Factory";
import { FarmStorage } from "../entities/FarmStorage";

export interface IProductionStrategy {
    produce(factory: Factory, storage: FarmStorage): Promise<void>;
    canProduce(factory: Factory, storage: FarmStorage): boolean;
}
