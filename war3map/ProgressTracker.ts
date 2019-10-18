export class ProgressTracker {
    public static lives: number = 30;

    private static onExitRegion: trigger;

    public static init() {
        ProgressTracker.onExitRegion = CreateTrigger();
        TriggerAddAction(ProgressTracker.onExitRegion, () => {
            RemoveUnit(GetEnteringUnit());
            ProgressTracker.lives -= 1;
        });
    }

    public static AddCreepExitRegion(enter: rect, creepPlayer: player) {
        const reg = CreateRegion();
        RegionAddRect(reg, enter);
        TriggerRegisterEnterRegion(ProgressTracker.onExitRegion, reg, Filter(() => {
            return (GetOwningPlayer(GetFilterUnit()) == creepPlayer);
        }));
    }
}
ceres.addHook("main::after", ProgressTracker.init);