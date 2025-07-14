import { Subject } from "./Subject";

export interface IObserver {
    update(subject: Subject): void;
}
