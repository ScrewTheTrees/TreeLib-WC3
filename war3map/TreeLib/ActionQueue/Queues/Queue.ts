export interface Queue {
    isFinished: boolean;
    update(): void;
}