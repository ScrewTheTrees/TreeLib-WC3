export interface Queue {
    isFinished: boolean;
    isPaused: boolean;

    init(): void;
    finish(): void;
}