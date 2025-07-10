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
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createField(CultivationType.PEUPLIER);
farmManager.createMachine();
farmManager.createFactory(FactoryType.BOULANGERIE);
farmManager.createFactory(FactoryType.ATELIER_DE_COUTURE);
farmManager.createFactory(FactoryType.SCIERIE);
farmManager.createFactory(FactoryType.SCIERIE);
farmManager.createFactory(FactoryType.SCIERIE);
farmManager.createFactory(FactoryType.SCIERIE);
farmManager.createFactory(FactoryType.FABRIQUE_DE_WAGONS);
farmManager.report();

farmManager.sendMachineToField();
farmManager.startAllCultivation();
