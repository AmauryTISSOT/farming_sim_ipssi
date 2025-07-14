import prisma from "../Client";
import { Prisma } from "@prisma/client";

export class FactoryRepository {
    async create(data: Prisma.FactoryCreateInput) {
        return await prisma.factory.create({ data });
    }

    async findById(id: number) {
        return await prisma.factory.findUnique({
            where: { id },
        });
    }

    async findAll() {
        return await prisma.factory.findMany();
    }

    async update(id: number, data: Prisma.FactoryUpdateInput) {
        return await prisma.factory.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.factory.delete({
            where: { id },
        });
    }

    async findByType(type: string) {
        return await prisma.factory.findMany({
            where: { type },
        });
    }

    async findStopped() {
        return await prisma.factory.findMany({
            where: { stopped: true },
        });
    }

    async findActive() {
        return await prisma.factory.findMany({
            where: { stopped: false },
        });
    }

    async findByRequiredGood(good: string) {
        return await prisma.factory.findMany({
            where: {
                requiredGoods: {
                    has: good,
                },
            },
        });
    }

    async startFactory(id: number) {
        return await prisma.factory.update({
            where: { id },
            data: { stopped: false },
        });
    }

    async stopFactory(id: number) {
        return await prisma.factory.update({
            where: { id },
            data: { stopped: true },
        });
    }
}
