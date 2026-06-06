local QBCore = exports['qb-core']:GetCoreObject({ 'Functions' })
local scoreboardOpen = false
local scoreboardRequested = false
local playerOptin = {}

-- Functions

local function DrawText3D(x, y, z, text)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)
    BeginTextCommandDisplayText('STRING')
    SetTextCentre(true)
    AddTextComponentSubstringPlayerName(text)
    SetDrawOrigin(x, y, z, 0)
    EndTextCommandDisplayText(0.0, 0.0)
    local factor = (string.len(text)) / 370
    DrawRect(0.0, 0.0 + 0.0125, 0.017 + factor, 0.03, 0, 0, 0, 75)
    ClearDrawOrigin()
end

local function GetPlayers()
    local players = {}
    local activePlayers = GetActivePlayers()
    for i = 1, #activePlayers do
        local player = activePlayers[i]
        local ped = GetPlayerPed(player)
        if DoesEntityExist(ped) then
            players[#players + 1] = player
        end
    end
    return players
end

local function GetPlayersFromCoords(coords, distance)
    local players = GetPlayers()
    local closePlayers = {}
    coords = coords or GetEntityCoords(PlayerPedId())
    distance = distance or 5.0
    for i = 1, #players do
        local player = players[i]
        local target = GetPlayerPed(player)
        local targetCoords = GetEntityCoords(target)
        local targetdistance = #(targetCoords - vector3(coords.x, coords.y, coords.z))
        if targetdistance <= distance then
            closePlayers[#closePlayers + 1] = player
        end
    end
    return closePlayers
end

-- Events

RegisterNetEvent('qb-scoreboard:client:SetActivityBusy', function(activity, busy)
    Config.IllegalActions[activity].busy = busy
end)

RegisterNetEvent('qb-scoreboard:client:ScoreboardClosed', function()
    scoreboardOpen = false
end)

-- Command

RegisterCommand('scoreboard', function()
    if scoreboardRequested then return end

    if scoreboardOpen then
        NUI.Close()
        scoreboardOpen = false
        return
    end

    scoreboardRequested = true
    QBCore.Functions.TriggerCallback('qb-scoreboard:server:GetScoreboardData', function(totalPlayers, cops, playerList, jobCounts)
        scoreboardRequested = false
        playerOptin = playerList

        NUI.Open({
            totalPlayers = totalPlayers,
            maxPlayers = Config.MaxPlayers,
            emergencyCount = cops,
            players = playerList,
            requiredCops = Config.IllegalActions,
            currentCops = cops,
            jobs = Config.jobs,
            jobCounts = jobCounts or {}
        })

        scoreboardOpen = true
    end)
end, false)

RegisterKeyMapping('scoreboard', 'Open Scoreboard', 'keyboard', Config.OpenKey)

-- Threads

CreateThread(function()
    Wait(1000)
    local actions = {}
    for k, v in pairs(Config.IllegalActions) do
        actions[k] = v.label
    end
    SendNUIMessage({
        action = 'setup',
        items = actions
    })
end)

CreateThread(function()
    while true do
        local loop = 100
        if scoreboardOpen then
            for _, player in pairs(GetPlayersFromCoords(GetEntityCoords(PlayerPedId()), 10.0)) do
                local playerId = GetPlayerServerId(player)
                local playerPed = GetPlayerPed(player)
                local playerCoords = GetEntityCoords(playerPed)
                if Config.ShowIDforALL or playerOptin[playerId].optin then
                    loop = 0
                    DrawText3D(playerCoords.x, playerCoords.y, playerCoords.z + 1.0, '[' .. playerId .. ']')
                end
            end
        end
        Wait(loop)
    end
end)