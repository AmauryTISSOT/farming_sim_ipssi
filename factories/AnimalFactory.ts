import { Animal } from "../entities/Animal";
import { AnimalType } from "../enums/AnimalType";
import { InputResourceType } from "../enums/InputResourceType";

export class AnimalFactory {
    private static nextId = 1;

    public static createAnimal(type: AnimalType): Animal {
        switch (type) {
            case AnimalType.COW:
                return new Animal(
                    this.nextId++,
                    AnimalType.COW,
                    [
                        { type: InputResourceType.LAIT, quantity: 20 },
                        { type: InputResourceType.FUMIER, quantity: 5 },
                    ],
                    10, // coût
                    3, // consommation d’eau
                    3 // consommation d’herbe
                );

            case AnimalType.SHEEP:
                return new Animal(
                    this.nextId++,
                    AnimalType.SHEEP,
                    [
                        { type: InputResourceType.LAINE, quantity: 5 },
                        { type: InputResourceType.FUMIER, quantity: 5 },
                    ],
                    5,
                    2,
                    2
                );

            case AnimalType.CHICKEN:
                return new Animal(
                    this.nextId++,
                    AnimalType.CHICKEN,
                    [{ type: InputResourceType.OEUFS, quantity: 1 }],
                    1,
                    1,
                    1
                );

            default:
                throw new Error(`Unsupported animal type: ${type}`);
        }
    }

    public static createHerd(type: AnimalType, count: number): Animal[] {
        const herd: Animal[] = [];
        for (let i = 0; i < count; i++) {
            herd.push(this.createAnimal(type));
        }
        return herd;
    }
}
