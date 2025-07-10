import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { ISubject } from "../observers/ISubject";
import { FactoryType } from "../enums/FactoryType";
import { InputResourceType } from "../enums/InputResourceType";
import { OutputResourceType } from "../enums/OutputResourceType";
import { STORAGE_CONST } from "../constants/StorageConstants";
import { FarmStorage } from "./FarmStorage";
import { IProductionStrategy } from "../strategy/IProductionStrategy";

export class Factory implements IObserver {
    public id: number;
    public type: FactoryType;
    public requiredGoods: InputResourceType[];
    public result: OutputResourceType;
    public multiplier: number;
    private stopped = false;
    private productionStrategy: IProductionStrategy;

    constructor(
        id: number,
        type: FactoryType,
        requiredGoods: InputResourceType[],
        result: OutputResourceType,
        multiplier: number,
        strategy: IProductionStrategy
    ) {
        this.id = id;
        this.type = type;
        this.requiredGoods = requiredGoods;
        this.result = result;
        this.multiplier = multiplier;
        this.productionStrategy = strategy;
    }

    public update(subject: ISubject): void {
        if (
            subject instanceof Subject &&
            subject.state >= STORAGE_CONST.MAX_STORAGE_CAPACITY
        ) {
            console.log(
                `Factory ${this.id} - ${this.type} → Max capacity reached (${subject.state})  STOPPED`
            );
            this.stopped = true;
        } else {
            if (this.stopped) {
                console.log(`Factory ${this.id} - ${this.type} → Resumed`);
            }
            this.stopped = false;
        }
    }

    public produce(storage: FarmStorage): void {
        if (!this.stopped) {
            this.productionStrategy.produce(this, storage);
        }
    }

    public canProduce(storage: FarmStorage): boolean {
        return this.productionStrategy.canProduce(this, storage);
    }
}
