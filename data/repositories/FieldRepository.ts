import prisma from "../Client";
import { Prisma } from "@prisma/client";

export class FieldRepository {
    async create(data: Prisma.FieldCreateInput) {
        return await prisma.field.create({ data });
    }

    async findById(id: number) {
        return await prisma.field.findUnique({
            where: { id },
        });
    }

    async findAll() {
        return await prisma.field.findMany();
    }

    async update(id: number, data: Prisma.FieldUpdateInput) {
        return await prisma.field.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.field.delete({
            where: { id },
        });
    }

    async findByState(state: string) {
        return await prisma.field.findMany({
            where: { state },
        });
    }

    async findByType(type: string) {
        return await prisma.field.findMany({
            where: { type },
        });
    }

    async findStopped() {
        return await prisma.field.findMany({
            where: { stopped: true },
        });
    }

    async findSowed() {
        return await prisma.field.findMany({
            where: { isSowed: true },
        });
    }

    async findCurrentlyCultivated() {
        return await prisma.field.findMany({
            where: { currentlyCultivated: true },
        });
    }

    async getTotalYield() {
        const result = await prisma.field.aggregate({
            _sum: { yield: true },
        });
        return result._sum.yield || 0;
    }
}
