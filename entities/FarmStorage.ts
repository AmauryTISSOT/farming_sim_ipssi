import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { Goods } from "./Goods";

export class FarmStorage {
    static #instance: FarmStorage;
    public maxCapacity: number = 100000;
    public readonly stock: Map<string, number> = new Map();
    public subject: Subject = new Subject();

    public constructor() {}

    public static get instance(): FarmStorage {
        if (!FarmStorage.#instance) {
            FarmStorage.#instance = new FarmStorage();
        }

        return FarmStorage.#instance;
    }

    public addGoods(goods: Goods): void {
        const existingQuantity = this.stock.get(goods.name.toString()) || 0;
        const newQuantity = existingQuantity + goods.quantity;

        if (
            this.stock.size >= this.maxCapacity &&
            !this.stock.has(goods.name.toString())
        ) {
            console.log("Storage is full. Cannot add new type of goods.");
            return;
        }

        this.stock.set(goods.name.toString(), newQuantity);
        this.subject.state = this.getTotalQuantity();
        console.log(`Current quantity is : ${this.getTotalQuantity()}`);
        this.subject.notify();
    }

    public removeGoods(goods: Goods): void {
        const existingQuantity = this.stock.get(goods.name.toString());

        if (!existingQuantity) {
            console.log(`Goods ${goods.name} not found in stock.`);
            return;
        }

        const remaining = existingQuantity - goods.quantity;

        if (remaining > 0) {
            this.stock.set(goods.name.toString(), remaining);
        } else {
            this.stock.delete(goods.name.toString());
        }

        console.log(`Removed ${goods.quantity} of ${goods.name} from stock.`);
        this.subject.state = this.getTotalQuantity();
        this.subject.notify();
    }

    public attachObserver(observer: IObserver): void {
        this.subject.attach(observer);
    }

    public printStock(): void {
        if (this.stock.size === 0) {
            console.log("Stock is empty");
            return;
        }

        console.log("");
        console.log("====================================");
        console.log("Stock :");
        for (const [name, quantity] of this.stock.entries()) {
            console.log(`Name: ${name}, Quantity: ${quantity}`);
        }
        console.log("====================================");
        console.log(`Total : ${this.getTotalQuantity()} $`);
        console.log("====================================");
        console.log("");
    }

    private getTotalQuantity(): number {
        let total = 0;
        for (const quantity of this.stock.values()) {
            total += quantity;
        }
        return total;
    }
}
