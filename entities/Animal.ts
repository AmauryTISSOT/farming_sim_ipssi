import { AnimalType } from "../enums/AnimalType";
import { InputResourceType } from "../enums/InputResourceType";

export class Animal {
    public id: number;
    public type: AnimalType;
    public products: { type: InputResourceType; quantity: number }[];
    public cost: number;
    public waterConsumption: number;
    public grassConsumption: number;
    private personalGrassStock: number = 10;
    private alive: boolean = true;
    private stopped: boolean = false;

    constructor(
        id: number,
        type: AnimalType,
        products: { type: InputResourceType; quantity: number }[],
        cost: number,
        waterConsumption: number,
        grassConsumption: number
    ) {
        this.id = id;
        this.type = type;
        this.products = products;
        this.cost = cost;
        this.waterConsumption = waterConsumption;
        this.grassConsumption = grassConsumption;
    }

    public isAlive(): boolean {
        if (this.personalGrassStock < -5) {
            console.log(`Animal - ${this.type} is dead !`);
            this.alive = false;
            return false;
        }
        console.log(`Animal - ${this.type} is alive !`);
        return true;
    }

    public stopProduction(): void {
        if (this.personalGrassStock < 0) {
            console.log(`Animal - ${this.type} stop production !`);
            this.stopped = true;
        } else {
            this.stopped = false;
        }
    }

    public produce(): { type: InputResourceType; quantity: number }[] {
        if (!this.alive) {
            console.log(`Animal - ${this.type} is dead, cannot produce.`);
            return [];
        }

        if (this.stopped) {
            console.log(`Animal - ${this.type} has stopped production.`);
            return [];
        }

        console.log(`Animal - ${this.type} produces:`, this.products);
        return this.products;
    }

    public consumeResources(): void {
        this.personalGrassStock -= this.grassConsumption;
        this.stopProduction();
        this.isAlive();
    }
}
