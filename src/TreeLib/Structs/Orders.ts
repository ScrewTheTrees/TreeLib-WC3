/**
 * Orders contain OrderIDS.
 * Some of them are, very internal.
 */
export class Orders {
    public static rally = 851970; // dispatches unit to the rally point
    public static smart = 851971; // user right-clicked a coord or a unit
    public static stop = 851972; // stop button pressed
    public static pause = 851973; // stop processing orders until the pause order completes
    public static ai = 851974; // force a unit to take AI-determined actions
    public static cancel = 851975; // cancel current order
    public static cancelbuild = 851976; // cancel something in progress
    public static cancelrevive = 851977; // cancel specific hero in revive queue
    public static canceltrain = 851978; // cancel a specific request in the build queue
    public static canceltargetmode = 851979; // cancels target-cursor mode
    public static setrally = 851980; // set a rally point for a structure that trains units
    public static getitem = 851981; // specific order for picking up item so we can issue it from scripts
    public static suicide = 851982; // attack anything on map until I'm dead
}