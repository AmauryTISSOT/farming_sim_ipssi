import { CultivationType } from "../enums/CultivationType";
import { OutputResourceType } from "../enums/OutputResourceType";

export class Goods {
    public name: CultivationType | OutputResourceType;
    public quantity: number;

    constructor(name: CultivationType | OutputResourceType, quantity: number) {
        this.name = name;
        this.quantity = quantity;
    }
}
