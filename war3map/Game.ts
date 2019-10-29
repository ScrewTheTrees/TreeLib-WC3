import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";
import {AttackingUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackingUnitIsHeroDDSFilter";
import {AttackedUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackedUnitIsHeroDDSFilter";
import {AttackedPlayersDDSFilter} from "./TreeLib/DDS/Filters/AttackedPlayersDDSFilter";
import {AttackingPlayersDDSFilter} from "./TreeLib/DDS/Filters/AttackingPlayersDDSFilter";
import {Delay} from "./TreeLib/Utility/Delay";
import {DummyCaster} from "./TreeLib/DummyCasting/DummyCaster";
import {Players} from "./TreeLib/Structs/Players";
import {Point} from "./TreeLib/Utility/Point";
import {ActionQueue} from "./TreeLib/ActionQueue/ActionQueue";
import {UnitWaypointAction} from "./TreeLib/ActionQueue/Actions/UnitWaypointAction";
import {WaypointOrders} from "./TreeLib/ActionQueue/Actions/WaypointOrders";
import {UnitDeathAction} from "./TreeLib/ActionQueue/Actions/UnitDeathAction";
import {UnitKillAction} from "./TreeLib/ActionQueue/Actions/UnitKillAction";

export class Game {
    private dummyCaster: DummyCaster;
    private actionQueue: ActionQueue;
    private delay: Delay;

    constructor() {
        Logger.doLogVerbose = true;
        this.delay = Delay.getInstance();

        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(AttackingPlayersDDSFilter.RED);
        redHeroAttacksBlueUnit.addFilter(new AttackingUnitIsHeroDDSFilter());

        redHeroAttacksBlueUnit.addFilter(AttackedPlayersDDSFilter.BLUE);
        redHeroAttacksBlueUnit.addFilter(new AttackedUnitIsHeroDDSFilter(true));

        let redAttacksAnyone = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("With the power of flextape!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redAttacksAnyone.addFilter(AttackingPlayersDDSFilter.RED);
        redAttacksAnyone.addFilter(new AttackedPlayersDDSFilter(Players.BLUE, Players.TEAL));

        this.dummyCaster = DummyCaster.getInstance();
        let archmage = _G["gg_unit_Hamg_0003"];
        let knight = _G["gg_unit_hkni_0010"];

        this.delay.addDelay(() => {
            this.dummyCaster.castAtWidgetInstant(FourCC("ACf3"), "fingerofdeath", knight, archmage);
            this.dummyCaster.castImmediately(FourCC("ACds"), "divineshield", archmage);
            this.dummyCaster.channelAtPoint(FourCC("ACfs"), "flamestrike", Point.fromWidget(archmage), archmage, 0, 15);
        }, 5);

        this.actionQueue = ActionQueue.getInstance();

        this.delay.addDelay(() => {
            let mortar = CreateUnit(Players.RED, FourCC("hmtm"), -1400, -3000, 0);
            this.actionQueue.createUnitQueue(mortar,
                new UnitWaypointAction(new Point(870, -3064)),
                new UnitWaypointAction(new Point(870, -1450), WaypointOrders.smart),
                new UnitWaypointAction(new Point(2000, -1450), WaypointOrders.attack),
                new UnitKillAction(archmage, 5),
                new UnitDeathAction(true),
            )
        }, 2, 5);

    }
}