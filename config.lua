Config = Config or {}

Config.Toggle = true
Config.OpenKey = 'HOME'
Config.ShowIDforALL = false
Config.MaxPlayers = GetConvarInt('sv_maxclients', 48)


Config.jobs = {
    ['police'] = {
        label = 'Police',
        icon = 'fa-solid fa-shield-halved',
        accentColor = '#3B82F6',
    },
    ['ambulance'] = {
        label = 'Ambulance',
        icon = 'fa-solid fa-briefcase-medical',
        accentColor = '#EF4444',
    },
    ['sherrif'] = {
        label = 'Sheriff',
        icon = 'fa-solid fa-shield-halved',
        accentColor = '#F59E0B',
    },
    ['taxi'] = {
        label = 'Taxi',
        icon = 'fa-solid fa-taxi',
        accentColor = '#EAB308',
    },
}

Config.IllegalActions = {
    ['storerobbery'] = {
        minimumPolice = 1,
        busy = false,
        label = 'Store Robbery',
        icon = 'fa-solid fa-shop',
    },
    ['bankrobbery'] = {
        minimumPolice = 3,
        busy = false,
        label = 'Bank Robbery',
        icon = 'fa-solid fa-building-columns',
    },
    ['jewellery'] = {
        minimumPolice = 2,
        busy = false,
        label = 'Jewelery',
        icon = 'fa-solid fa-gem',
    },
    ['pacific'] = {
        minimumPolice = 5,
        busy = false,
        label = 'Pacific Bank',
        icon = 'fa-solid fa-ship',
    },
    ['paleto'] = {
        minimumPolice = 4,
        busy = false,
        label = 'Paleto Bay Bank',
        icon = 'fa-solid fa-warehouse',
    },
    ['museum'] = {
        minimumPolice = 3,
        busy = false,
        label = 'Museum Heist',
        icon = 'fa-solid fa-landmark',
    },
    ['casino'] = {
        minimumPolice = 5,
        busy = false,
        label = 'Casino Job',
        icon = 'fa-solid fa-dice',
    },
    ['armored'] = {
        minimumPolice = 4,
        busy = false,
        label = 'Armored Truck',
        icon = 'fa-solid fa-shield-halved',
    },
    ['drugrun'] = {
        minimumPolice = 2,
        busy = false,
        label = 'Drug Run',
        icon = 'fa-solid fa-droplet',
    },
    ['gallery'] = {
        minimumPolice = 3,
        busy = false,
        label = 'Gallery Job',
        icon = 'fa-solid fa-paint-brush',
    },
}