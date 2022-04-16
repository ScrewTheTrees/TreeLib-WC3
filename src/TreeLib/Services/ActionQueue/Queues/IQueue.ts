export interface IQueue {
    isFinished: boolean;
    isPaused: boolean;

    init(): void;
    finish(): void;
}