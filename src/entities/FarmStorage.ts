import { StockItemRepository } from "../data/repositories/StockItemRepository";
import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { Goods } from "./Goods";

export class FarmStorage {
    static #instance: FarmStorage;
    public maxCapacity: number = 100000;
    public readonly stock: Map<string, number> = new Map();
    public subject: Subject = new Subject();

    private stockItemRepository: StockItemRepository;

    public constructor() {
        this.stockItemRepository = new StockItemRepository();
        this.syncWithDatabase();
    }

    public static get instance(): FarmStorage {
        if (!FarmStorage.#instance) {
            FarmStorage.#instance = new FarmStorage();
        }

        return FarmStorage.#instance;
    }

    public async addGoods(goods: Goods): Promise<void> {
        const key = goods.name.toString();
        const existingQuantity = this.stock.get(key) || 0;
        const newQuantity = existingQuantity + goods.quantity;

        if (this.stock.size >= this.maxCapacity && !this.stock.has(key)) {
            console.log("Storage is full. Cannot add new type of goods.");
            return;
        }

        this.stock.set(key, newQuantity);

        await this.stockItemRepository.addToStock(key, goods.quantity);

        this.subject.state = this.getTotalQuantity();
        console.log(`Current quantity is : ${this.getTotalQuantity()}`);
        this.subject.notify();
    }

    public async removeGoods(goods: Goods): Promise<void> {
        const key = goods.name.toString();
        const existingQuantity = this.stock.get(key);

        if (!existingQuantity || existingQuantity < goods.quantity) {
            console.log(`Goods ${key} not found or insufficient in stock.`);
            return;
        }

        const remaining = existingQuantity - goods.quantity;

        if (remaining > 0) {
            this.stock.set(key, remaining);
        } else {
            this.stock.delete(key);
        }

        try {
            await this.stockItemRepository.removeFromStock(key, goods.quantity);
        } catch (error) {
            console.error(`Error removing from DB stock: ${error}`);
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

    private async syncWithDatabase(): Promise<void> {
        const allStock = await this.stockItemRepository.findAll();
        allStock.forEach((item) => {
            this.stock.set(item.key, item.value);
        });
        this.subject.state = this.getTotalQuantity();
        this.subject.notify();
    }
}
