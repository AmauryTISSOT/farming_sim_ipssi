import { Factory } from "../entities/Factory";
import { FarmStorage } from "../entities/FarmStorage";
import { InputResourceType } from "../enums/InputResourceType";
import { IProductionStrategy } from "./IProductionStrategy";
import { Goods } from "../entities/Goods";

export abstract class ProductionStrategy implements IProductionStrategy {
    abstract getRequiredGoods(factory: Factory): InputResourceType[];

    public canProduce(factory: Factory, storage: FarmStorage): boolean {
        const inputs = this.getRequiredGoods(factory);
        return inputs.every((input) => (storage.stock.get(input) || 0) >= 1);
    }

    public async produce(
        factory: Factory,
        storage: FarmStorage
    ): Promise<void> {
        const inputs = this.getRequiredGoods(factory);

        if (inputs.length === 0) {
            console.log(`Factory ${factory.id} has no defined inputs.`);
            return;
        }

        let producibleAmount = 0;

        if (inputs.length === 1) {
            const input = inputs[0];
            producibleAmount = storage.stock.get(input) || 0;

            if (producibleAmount <= 0) {
                console.log(
                    `Factory ${factory.id} cannot produce due to insufficient ${input}`
                );
                return;
            }

            storage.removeGoods(new Goods(input, producibleAmount));
        } else {
            // Cas multi-ingrédients : prendre le minimum disponible
            const quantities = inputs.map(
                (input) => storage.stock.get(input) || 0
            );
            producibleAmount = Math.min(...quantities);

            if (producibleAmount <= 0) {
                console.log(
                    `Factory ${factory.id} cannot produce due to insufficient resources`
                );
                return;
            }

            for (const input of inputs) {
                storage.removeGoods(new Goods(input, producibleAmount));
            }
        }

        const output = new Goods(
            factory.result,
            producibleAmount * factory.multiplier
        );
        storage.addGoods(output);

        console.log(
            `Factory ${factory.id} produced ${output.quantity} ${
                output.name
            } using ${producibleAmount} unit(s) of ${
                inputs.length === 1 ? inputs[0] : "each input"
            }`
        );
    }
}
