-- Lua Library inline imports
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

local ____exports = {}
local __TSTL_Wave = require("war3map.Wave")
local Wave = __TSTL_Wave.Wave
local __TSTL_WaveUnitTypes = require("war3map.WaveUnitTypes")
local WaveUnitTypes = __TSTL_WaveUnitTypes.WaveUnitTypes
____exports.WaveHandler = {}
local WaveHandler = ____exports.WaveHandler
WaveHandler.name = "WaveHandler"
WaveHandler.__index = WaveHandler
WaveHandler.prototype = {}
WaveHandler.prototype.__index = WaveHandler.prototype
WaveHandler.prototype.constructor = WaveHandler
function WaveHandler.new(...)
    local self = setmetatable({}, WaveHandler.prototype)
    self:____constructor(...)
    return self
end
function WaveHandler.prototype.____constructor(self)
    self.currentWave = 0
    self.allWaves = {}
    self.waveTimer = 0
    self.timeBetweenSpawns = 0.05
    self.timeBetweenWaves = 5
    self.amountOfUnitsTotal = 90
    self.waveInProgress = false
    self.onWaveStart = {}
    self.onWaveEnd = {}
    self.sendSpawnSignal = {}
    self:generateWaves()
    self.timer = CreateTimer()
    self.timerDialog = CreateTimerDialog(self.timer)
    self.timerTrigger = CreateTrigger()
    TriggerRegisterTimerExpireEvent(self.timerTrigger, self.timer)
    TriggerAddAction(self.timerTrigger, function()
        __TS__ArrayForEach(self.onWaveStart, function(____, callback)
            callback(nil, self.allWaves[2])
        end)
        self:spawnWave()
    end)
end
function WaveHandler.prototype.startWaveTimer(self)
    TimerStart(self.timer, self.timeBetweenWaves, false, nil)
    TimerDialogSetTitle(self.timerDialog, "Next wave in:")
    TimerDialogDisplay(self.timerDialog, true)
end
function WaveHandler.prototype.generateWaves(self)
    self.allWaves[2] = Wave.new(WaveUnitTypes:get(1))
    self.allWaves[3] = Wave.new(WaveUnitTypes:get(2))
end
function WaveHandler.prototype.spawnWave(self)
    self.currentWave = self.currentWave + 1
    local spawner = CreateTrigger()
    self.waveInProgress = true
    local counter = self.amountOfUnitsTotal
    TriggerRegisterTimerEvent(spawner, self.timeBetweenSpawns, true)
    TriggerAddAction(spawner, function()
        __TS__ArrayForEach(self.sendSpawnSignal, function(____, callback)
            if counter > 0 and GetRandomInt(1, 10) == 1 then
                callback(nil, self.allWaves[self.currentWave + 1])
                counter = counter - 1
            end
            if counter <= 0 then
                self:_onWaveEnd()
                DestroyTrigger(spawner)
                return
            end
        end)
    end)
end
function WaveHandler.prototype._onWaveEnd(self)
    self.waveInProgress = false
    __TS__ArrayForEach(self.onWaveEnd, function(____, callback)
        callback(nil)
    end)
end
return ____exports
