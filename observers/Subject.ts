import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";

export class Subject implements ISubject {
    public state: number = 0;
    private observers: IObserver[] = [];

    public attach(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log("Subject: Observer has bveen attached already");
        }
        console.log("Subject: Attached an observer");
        this.observers.push(observer);
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log("Subject: Nonexistent observer.");
        }

        this.observers.splice(observerIndex, 1);
        console.log("Subject: Detached an observer.");
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public checkMaxCapacity(): void {
        console.log(`Subject: state changed to ${this.state}`);
        this.notify();
    }
}
