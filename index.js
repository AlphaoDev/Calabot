const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.login("...");

client.on('ready', function() {
    client.user.setActivity('TODO Staff').catch(console.error);
})

var count = 0;

client.on('message', message => {
    if (message.channel.id === "701753317814173736") {
        if(message.author.id !== client.user.id) {
            count = count + 1;
            message.channel.setName(count + "-todo-admin");
            //console.log("count :" + count);
        }
    }
});

client.on('messageReactionAdd', async (reaction, user) => { 
    if(user.bot) return; const { message, emoji } = reaction; 
    if (message.channel.id === "701753317814173736"){
        let limit = 1;
        if(reaction.emoji.name === "✅" && reaction.count <= 1){
            count = count - 1;
            message.channel.setName(count + "-todo-admin");     
            //console.log("count :" + count);
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => { 
    if(user.bot) return; const { message, emoji } = reaction; 
    if (message.channel.id === "701753317814173736"){
        if(reaction.emoji.name === "✅"){
            if (reaction.count < 1){
                count = count + 1;
                message.channel.setName(count + "-todo-admin");
                //console.log("count :" + count);
            }
        }
    }
});

client.on('messageDelete', async (message) => {
    if (message.channel.id === "701753317814173736"){
        if(message.reactions.has("✅")){
            count = count
        } else {
            count = count - 1;
        }
        //console.log("count :" + count);
        message.channel.setName(count + "-todo-admin");
    }
});