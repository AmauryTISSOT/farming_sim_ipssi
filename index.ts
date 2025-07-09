import express from "express";
import { FarmManager } from "./entities/FarmManager";
import { CultivationType } from "./enums/CultivationType";
import { Goods } from "./entities/Goods";
import { FactoryType } from "./enums/FactoryType";
import { MachineInvoker } from "./command/MachineInvoker";
import { PlowCommand } from "./command/PlowCommand";
import { SowCommand } from "./command/SowCommand";
import { FertilizeCommand } from "./command/FertilizeCommand";
import { HarvestCommand } from "./command/HarvestCommand";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello TypeScript + Express!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Test Facade / Factory
// Create Field - Machine - Factory
const farmManager = new FarmManager();
farmManager.createField(1, CultivationType.BLE);
farmManager.createField(2, CultivationType.BLE);
farmManager.createMachine();
farmManager.createFactory(FactoryType.BOULANGERIE);
farmManager.createFactory(FactoryType.ATELIER_DE_COUTURE);
farmManager.report();

// Test Observer
for (let i = 0; i < 100; i++) {
    farmManager.storage.addGoods(i, new Goods(CultivationType.OLIVE, 5));
}

// Test removeGoods
farmManager.storage.removeGoods(1, new Goods(CultivationType.OLIVE, 5));
farmManager.storage.removeGoods(2, new Goods(CultivationType.OLIVE, 5));
farmManager.storage.removeGoods(3, new Goods(CultivationType.OLIVE, 5));
farmManager.storage.removeGoods(4, new Goods(CultivationType.OLIVE, 5));

farmManager.storage.printStock();

// Test FieldState
const testfield = farmManager.fields[0];
console.log(testfield.getState());
testfield.nextCycle();
testfield.nextCycle();
testfield.nextCycle();
testfield.nextCycle();
testfield.nextCycle();
console.log(testfield.getState());

// Test harvest command
const invoker = new MachineInvoker();
invoker.addCommand(new PlowCommand(testfield));
invoker.addCommand(new SowCommand(testfield));
invoker.addCommand(new FertilizeCommand(testfield));
invoker.addCommand(new HarvestCommand(testfield));

invoker.executeAll();
