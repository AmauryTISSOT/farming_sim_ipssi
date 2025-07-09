import { ICommand } from "./ICommand";

export class MachineInvoker {
    private queue: ICommand[] = [];

    public addCommand(command: ICommand): void {
        this.queue.push(command);
    }

    public async executeAll(): Promise<void> {
        for (const cmd of this.queue) {
            await cmd.execute();
        }
        this.queue = [];
    }
}
