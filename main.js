const Discord = require('discord.js')
const fs      = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

var client = new Discord.Client()

client.on('ready', () => {
    client.user.setActivity(config.status, {type: config.statustype})
    console.log(`Online`)
})


var cmdmap = {
    news : cmd_news //Change news to your command NOT cmd_news
}

function cmd_news(msg, args) {
    if (msg.author.id == config.owner) {
    client.channels.get(config.channelidsend).send(args.join(' '))
    console.log("Worked")
    } else {
    msg.channel.send(config.norights)
    console.log("Error")
    }
}



client.on('message', (msg) => {


    var cont   = msg.content,
        member = msg.member,
        chan   = msg.channel,
        guild  = msg.guild,
        author = msg.author

        if (author.id != client.user.id && cont.startsWith(config.prefix)) {

            
            // 
            var invoke = cont.split(' ')[0].substr(config.prefix.length),
                args   = cont.split(' ').slice(1)
            
            
            if (invoke in cmdmap) {
                cmdmap[invoke](msg, args)
            }
        }

})


client.login(config.token)