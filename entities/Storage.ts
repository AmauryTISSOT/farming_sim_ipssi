import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { Goods } from "./Goods";

export class Storage {
    static #instance: Storage;
    public maxCapacity: number = 100;
    public readonly stock: Map<number, Goods> = new Map();
    public subject: Subject = new Subject();

    private constructor() {}

    public static get instance(): Storage {
        if (!Storage.#instance) {
            Storage.#instance = new Storage();
        }

        return Storage.#instance;
    }

    public addGoods(id: number, goods: Goods): void {
        if (this.stock.size >= this.maxCapacity) {
            console.log("Storage is full. Cannot add more goods.");
            return;
        }

        this.stock.set(id, goods);
        this.subject.state = this.stock.size;
        this.subject.checkMaxCapacity();
    }

    public removeGoods(id: number, goods: Goods): void {
        console.log(`Goods id ${id} has been removed from stock.`);
        this.stock.delete(id);
        this.subject.state = this.stock.size;
        this.subject.checkMaxCapacity();
    }

    public attachObserver(observer: IObserver): void {
        this.subject.attach(observer);
    }

    public printStock(): void {
        if (this.stock.size === 0) {
            console.log("Le stock est vide.");
            return;
        }

        console.log("Contenu du stock :");
        for (const [id, goods] of this.stock.entries()) {
            console.log(
                `ID: ${id}, Nom: ${goods.name}, Quantité: ${goods.quantity}`
            );
        }
    }
}
