export interface Queue {
    isFinished: boolean;
    update(timeStep: number): void;
}