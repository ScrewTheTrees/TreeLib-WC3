export interface Queue {
    isFinished: boolean;
    isPaused: boolean;

    update(timeStep: number): void;
    init(): void;
}