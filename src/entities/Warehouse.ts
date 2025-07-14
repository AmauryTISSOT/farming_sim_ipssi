import { STORAGE_CONST } from "../constants/StorageConstants";
import { OutputResourceType } from "../enums/OutputResourceType";
import { FarmStorage } from "./FarmStorage";
import { Goods } from "./Goods";

export class WareHouse extends FarmStorage {
    public maxCapacity: number = STORAGE_CONST.MAX_WAREHOUSE_CAPACITY;

    public addGoods(goods: Goods): void {
        if (!this.isOutPutResourceType(goods.name)) {
            console.log(
                `Cannot add goods: ${goods.name} is not an OutputResourceType.`
            );
            return;
        }
        super.addGoods(goods);
    }

    private isOutPutResourceType(name: any): name is OutputResourceType {
        return Object.values(OutputResourceType).includes(name);
    }
}
