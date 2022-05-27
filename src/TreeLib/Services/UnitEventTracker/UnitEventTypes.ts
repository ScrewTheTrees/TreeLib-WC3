export enum UnitEventTypes {
    CREATED_ANY,          //Unit is created in ANY way, (hired, trained, summoned, trigger, construct). Sends created unit
    CREATED_TRIGGER,      //Unit is spawned using triggers. Sends created unit
    CREATED_DEAD,         //Unit is spawned as a corpse. Sends created body

    SOLD_UNIT,            //When a unit is sold by a merchant. Sends sold unit.
    SUMMONED,             //When a unit is summoned. Sends summoned unit.
    KILLED,               //When a unit gets killed. Sends dying unit.
    REMOVED,              //When a unit is removed from the game using triggers. (Maybe naturally in the future?)

    START_TRAINING,       //A unit starts training, sends training unit
    START_RESEARCH,       //A unit starts researching, sends researching unit
    START_UPGRADE,        //A unit starts upgrading, sends upgrading unit
    START_REVIVE,        //A hero starts reviving, send the hero being revived
    START_CONSTRUCTION,  //A unit starts upgrading, sends constructed building

    CANCEL_TRAINING,     //Cancel, sends training unit
    CANCEL_RESEARCHING,  //Cancel, sends researching unit
    CANCEL_UPGRADING,    //Cancel, sends upgrading unit
    CANCEL_REVIVE,       //Cancel, sends cancelled Hero
    CANCEL_CONSTRUCTION, //Cancel, sends cancelled building

    FINISH_TRAINING,     //Sends trained unit.
    FINISH_RESEARCHING,  //Sends researching unit.
    FINISH_UPGRADING,    //Sends upgraded unit.
    FINISH_REVIVE,       //Sends Revived hero.
    FINISH_CONSTRUCTION, //Sends finished building
}