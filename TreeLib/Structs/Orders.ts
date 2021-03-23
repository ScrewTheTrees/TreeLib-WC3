/**
 * Orders contain OrderIDS.
 * Some of them are, very internal.
 */
export const enum Orders {
    rally = 851970, // dispatches unit to the rally point
    smart = 851971, // user right-clicked a coord or a unit
    stop = 851972, // stop button pressed
    pause = 851973, // stop processing orders until the pause order completes
    ai = 851974, // force a unit to take AI-determined actions
    cancel = 851975, // cancel current order
    cancelbuild = 851976, // cancel something in progress
    cancelrevive = 851977, // cancel specific hero in revive queue
    canceltrain = 851978, // cancel a specific request in the build queue
    canceltargetmode = 851979, // cancels target-cursor mode
    setrally = 851980, // set a rally point for a structure that trains units
    getitem = 851981, // specific order for picking up item so we can issue it from scripts
    suicide = 851982, // attack anything on map until I'm dead
    attack = 851983,

    itemMoveSlot1 = 852002,
    itemMoveSlot2 = 852003,
    itemMoveSlot3 = 852004,
    itemMoveSlot4 = 852005,
    itemMoveSlot5 = 852006,
    itemMoveSlot6 = 852007,
    itemUseSlot1 = 852008,
    itemUseSlot2 = 852009,
    itemUseSlot3 = 852010,
    itemUseSlot4 = 852011,
    itemUseSlot5 = 852012,
    itemUseSlot6 = 852013,

    resumeharvest = 852017,
    harvest = 852018,

}