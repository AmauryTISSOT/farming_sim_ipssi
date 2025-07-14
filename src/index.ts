import express from "express";
import { FarmManager } from "./entities/FarmManager";
import { CultivationType } from "./enums/CultivationType";
import { FactoryType } from "./enums/FactoryType";
import { FieldRepository } from "./data/repositories/FieldRepository";
import { FactoryRepository } from "./data/repositories/FactoryRepository";
import { MachineRepository } from "./data/repositories/MachineRepository";
import { FarmStorage } from "./entities/FarmStorage";

const app = express();
const PORT = 3000;
const farmManager = new FarmManager();

const fieldRepository = new FieldRepository();
const factoryRepository = new FactoryRepository();
const machineRepository = new MachineRepository();

app.use(express.json());

app.patch("/createField", async (req, res) => {
    try {
        const { type } = req.body;

        if (!Object.values(CultivationType).includes(type)) {
            return res.status(400).json({ error: "Invalid cultivation type." });
        }

        const field = await farmManager.createField(type);

        if (!field) {
            return res
                .status(400)
                .json({ error: "Max field capacity reached." });
        }

        return res.status(201).json({ message: "Field created", field });
    } catch (error) {
        console.error("Error creating field:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/createMachine", async (req, res) => {
    try {
        await farmManager.createMachine();
        return res
            .status(201)
            .json({ message: "Machines created successfully." });
    } catch (error) {
        console.error("Error creating machines:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/createFactory", async (req, res) => {
    try {
        const { type } = req.body;

        if (!type || !Object.values(FactoryType).includes(type)) {
            return res
                .status(400)
                .json({ error: "Invalid or missing factory type." });
        }

        const factory = await farmManager.createFactory(type);
        return res
            .status(201)
            .json({ message: "Factory created successfully.", factory });
    } catch (error) {
        console.error("Error creating factory:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/sendMachinesToFields", async (req, res) => {
    try {
        await farmManager.sendMachineToField();
        return res
            .status(200)
            .json({ message: "Machines sent to fields successfully." });
    } catch (error) {
        console.error("Error sending machines to fields:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/startAllCultivation", async (req, res) => {
    try {
        await farmManager.startAllCultivation();
        return res
            .status(200)
            .json({ message: "Cultivation started successfully." });
    } catch (error) {
        console.error("Error starting cultivation:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

app.get("/field/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const field = await fieldRepository.findById(id);
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }
        return res.json(field);
    } catch (error) {
        console.error("Error getting field:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/fields", async (req, res) => {
    try {
        const fields = await fieldRepository.findAll();
        res.json(fields);
    } catch (error) {
        console.error("Error getting fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/machine/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const machine = await machineRepository.findById(id);
        if (!machine) {
            return res.status(404).json({ message: "Machine not found" });
        }
        res.json(machine);
    } catch (error) {
        console.error("Error getting machine:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/machines", async (req, res) => {
    try {
        const machines = await machineRepository.findAll();
        res.json(machines);
    } catch (error) {
        console.error("Error getting machines:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/factory/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const factory = await factoryRepository.findById(id);
        if (!factory) {
            return res.status(404).json({ message: "Factory not found" });
        }
        res.json(factory);
    } catch (error) {
        console.error("Error getting factory:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/factories", async (req, res) => {
    try {
        const factories = await factoryRepository.findAll();
        res.json(factories);
    } catch (error) {
        console.error("Error getting factories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/storage", (req, res) => {
    const storage = farmManager.farmStorage;
    const stock = Array.from(storage.stock.entries()).map(
        ([name, quantity]) => ({
            name,
            quantity,
        })
    );
    res.json({
        total: stock.reduce((sum, item) => sum + item.quantity, 0),
        items: stock,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

farmManager.report();
