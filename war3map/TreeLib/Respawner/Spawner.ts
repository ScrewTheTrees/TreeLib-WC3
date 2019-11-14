export interface Spawner {
    update(timeStep: number): void;
    delay: number;
    counter: number;
    respawns: number;
}