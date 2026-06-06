fx_version 'cerulean'
game 'gta5'
lua54 'yes'
author 'CodeRed Studio'
version '1.0.0'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client/nui.lua',
    'client/main.lua',
}

ui_page 'web/dist/index.html'


files {
    'web/dist/index.html',
    'web/dist/logo.png',
    'web/dist/assets/**/*',
}

server_scripts {
    'server/main.lua'
}

escrow_ignore {
    'config.lua',
}