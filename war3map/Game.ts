import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";
import {DDSFilterAttackingUnitIsHero} from "./TreeLib/DDS/Filters/DDSFilterAttackingUnitIsHero";
import {DDSFilterAttackedUnitIsHero} from "./TreeLib/DDS/Filters/DDSFilterAttackedUnitIsHero";
import {DDSFilterAttackedPlayers} from "./TreeLib/DDS/Filters/DDSFilterAttackedPlayers";
import {DDSFilterAttackingPlayers} from "./TreeLib/DDS/Filters/DDSFilterAttackingPlayers";
import {Delay} from "./TreeLib/Utility/Delay";
import {DummyCaster} from "./TreeLib/DummyCasting/DummyCaster";
import {Players} from "./TreeLib/Structs/Players";
import {Point} from "./TreeLib/Utility/Point";
import {ActionQueue} from "./TreeLib/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "./TreeLib/ActionQueue/Actions/UnitActionWaypoint";
import {WaypointOrders} from "./TreeLib/ActionQueue/Actions/WaypointOrders";
import {UnitActionDeath} from "./TreeLib/ActionQueue/Actions/UnitActionDeath";
import {UnitActionKillUnit} from "./TreeLib/ActionQueue/Actions/UnitActionKillUnit";
import {StringBuilderTest} from "./tests/StringBuilderTest";

export class Game {
    private dummyCaster: DummyCaster;
    private actionQueue: ActionQueue;
    private delay: Delay;

    constructor() {
        Logger.doLogVerbose = true;
        this.delay = Delay.getInstance();

        this.doTests();


        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackingPlayers.RED);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackingUnitIsHero());

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackedPlayers.BLUE);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackedUnitIsHero(true));

        let redAttacksAnyone = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("With the power of flextape!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redAttacksAnyone.addFilter(DDSFilterAttackingPlayers.RED);
        redAttacksAnyone.addFilter(new DDSFilterAttackedPlayers(Players.BLUE, Players.TEAL));

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
                new UnitActionWaypoint(new Point(870, -3064)),
                new UnitActionWaypoint(new Point(870, -1450), WaypointOrders.smart),
                new UnitActionWaypoint(new Point(2000, -1450), WaypointOrders.attack),
                new UnitActionKillUnit(archmage, 5),
                new UnitActionDeath(true),
            )
        }, 2, 5);

    }

    private doTests() {
        let sb = new StringBuilderTest();
        sb.run();
    }
}