import prisma from "../Client";
import { Prisma } from "@prisma/client";
export class StockItemRepository {
    async create(data: Prisma.StockItemCreateInput) {
        return await prisma.stockItem.create({ data });
    }

    async findById(id: number) {
        return await prisma.stockItem.findUnique({
            where: { id },
        });
    }

    async findAll() {
        return await prisma.stockItem.findMany();
    }

    async update(id: number, data: Prisma.StockItemUpdateInput) {
        return await prisma.stockItem.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.stockItem.delete({
            where: { id },
        });
    }

    async findByKey(key: string) {
        return await prisma.stockItem.findMany({
            where: { key },
        });
    }

    async findByKeyUnique(key: string) {
        return await prisma.stockItem.findFirst({
            where: { key },
        });
    }

    async updateQuantity(key: string, quantity: number) {
        const existingItem = await prisma.stockItem.findFirst({
            where: { key },
        });

        if (existingItem) {
            return await prisma.stockItem.update({
                where: { id: existingItem.id },
                data: { value: quantity },
            });
        } else {
            return await prisma.stockItem.create({
                data: { key, value: quantity },
            });
        }
    }

    async addToStock(key: string, quantity: number) {
        const existingItem = await prisma.stockItem.findFirst({
            where: { key },
        });

        if (existingItem) {
            return await prisma.stockItem.update({
                where: { id: existingItem.id },
                data: { value: existingItem.value + quantity },
            });
        } else {
            return await prisma.stockItem.create({
                data: { key, value: quantity },
            });
        }
    }

    async removeFromStock(key: string, quantity: number) {
        const existingItem = await prisma.stockItem.findFirst({
            where: { key },
        });

        if (existingItem && existingItem.value >= quantity) {
            return await prisma.stockItem.update({
                where: { id: existingItem.id },
                data: { value: existingItem.value - quantity },
            });
        } else {
            throw new Error(`Insufficient stock for ${key}`);
        }
    }

    async getTotalStock() {
        const result = await prisma.stockItem.aggregate({
            _sum: { value: true },
        });
        return result._sum.value || 0;
    }

    async getStockByKey(key: string) {
        const item = await prisma.stockItem.findFirst({
            where: { key },
        });
        return item?.value || 0;
    }

    async getAllStockSummary() {
        return await prisma.stockItem.groupBy({
            by: ["key"],
            _sum: { value: true },
        });
    }
}
