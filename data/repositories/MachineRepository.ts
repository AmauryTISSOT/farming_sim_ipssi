import prisma from "../Client";
import { Prisma } from "@prisma/client";

// Repository pour Machine
export class MachineRepository {
    async create(data: Prisma.MachineCreateInput) {
        return await prisma.machine.create({ data });
    }

    async findById(id: number) {
        return await prisma.machine.findUnique({
            where: { id },
        });
    }

    async findAll() {
        return await prisma.machine.findMany();
    }

    async update(id: number, data: Prisma.MachineUpdateInput) {
        return await prisma.machine.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.machine.delete({
            where: { id },
        });
    }

    async findByType(type: string) {
        return await prisma.machine.findMany({
            where: { type },
        });
    }

    async findOnField() {
        return await prisma.machine.findMany({
            where: { onTheField: true },
        });
    }

    async findInStorage() {
        return await prisma.machine.findMany({
            where: { onTheField: false },
        });
    }

    async deployToField(id: number) {
        return await prisma.machine.update({
            where: { id },
            data: { onTheField: true },
        });
    }

    async returnFromField(id: number) {
        return await prisma.machine.update({
            where: { id },
            data: { onTheField: false },
        });
    }

    async countByType() {
        return await prisma.machine.groupBy({
            by: ["type"],
            _count: { id: true },
        });
    }
}
