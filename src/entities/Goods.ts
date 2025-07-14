import { CultivationType } from "../enums/CultivationType";
import { InputResourceType } from "../enums/InputResourceType";
import { OutputResourceType } from "../enums/OutputResourceType";

export class Goods {
    public name: CultivationType | OutputResourceType | InputResourceType;
    public quantity: number;

    constructor(
        name: CultivationType | OutputResourceType | InputResourceType,
        quantity: number
    ) {
        this.name = name;
        this.quantity = quantity;
    }
}
