local __TSTL_Game = require("war3map.Game")
local Game = __TSTL_Game.Game
local gg_trg_Start
local gameInstance
function MapStart(self)
    xpcall(function()
        gameInstance = Game.new()
    end, print)
    DestroyTrigger(gg_trg_Start)
end
function NewMain(self)
    gg_trg_Start = CreateTrigger()
    TriggerRegisterTimerEvent(gg_trg_Start, 0, false)
    TriggerAddAction(gg_trg_Start, function() return MapStart(nil) end)
end
ceres.addHook("main::after", NewMain)
