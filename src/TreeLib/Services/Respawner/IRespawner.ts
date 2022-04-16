export interface IRespawner {
    update(timeStep: number): void;

    delay: number;
    counter: number;
    respawns: number;
    filter: ((arg: any) => boolean) | undefined;
}