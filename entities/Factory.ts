import { IObserver } from "../observers/IObserver";
import { Subject } from "../observers/Subject";
import { Goods } from "./Goods";
import { ISubject } from "../observers/ISubject";
import { FactoryType } from "../enums/FactoryType";
import { InputResourceType } from "../enums/InputResourceType";
import { OutputResourceType } from "../enums/OutputResourceType";

export class Factory implements IObserver {
    public id: number;
    public type: FactoryType;
    public requiredGoods: InputResourceType[];
    public result: OutputResourceType;
    public multiplier: number;
    private stopped = false;

    constructor(
        id: number,
        type: FactoryType,
        requiredGoods: InputResourceType[],
        result: OutputResourceType,
        multiplier: number
    ) {
        this.id = id;
        this.type = type;
        this.requiredGoods = requiredGoods;
        this.result = result;
        this.multiplier = multiplier;
    }

    public update(subject: ISubject): void {
        if (subject instanceof Subject && subject.state >= 100) {
            console.log(
                `Factory number ${this.id} - type ${this.type}: Max capacity reached - factory stopped`
            );
            this.stopped = true;
        } else {
            this.stopped = false;
        }
    }

    //TODO: product transform
    // Get Goods from storage -> transform -> addToStorage

    // public transform(inputs: Goods[]): Goods | null {
    //     if (this.stopped) {
    //         console.log(`Factory number ${this.id} - ${this.type} is stopped.`);
    //         return null;
    //     }

    //     const quantities = this.requiredGoods.map((req) => {
    //         const match = inputs.find((g) => g.name === req);
    //         if (!match) {
    //             throw new Error(`Missing Goods ${req}`);
    //         }
    //         return match.quantity;
    //     });

    //     const allEqual = new Set(quantities).size === 1;
    //     const minInput = Math.min(...quantities);

    //     if (this.requiredGoods.length > 1 && !allEqual) {
    //         throw new Error(
    //             `[${
    //                 this.type
    //             }] Need same quantity as : ${this.requiredGoods.join(", ")}`
    //         );
    //     }

    //     const totalOutput = minInput * this.multiplier;
    //     console.log(
    //         `[${this.type}] produce ${totalOutput} L of ${this.result}.`
    //     );
    //     return new Goods(this.result, totalOutput);
    // }
}
