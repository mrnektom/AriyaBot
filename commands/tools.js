
function wait(millis){
	return new Promise((resolve)=>{
		setTimeout(resolve,millis)
	})
}

let commands = [
  {
    name:"help",
    description:"Shows information for commands",
    type:"CHAT_INPUT",
    async callback(i){
      let r = []
      r.push("```\n")
      for(let [id,c] of (await i.client.application.commands.fetch())){
      	if(!c || !c.name)continue;
      	r.push(c.name + "\n")
      	r.push("  "+c?.description + "\n\n")
      }
      r.push("```")
      i.reply(r.join(""))
    }
  },
  {
    type:"CHAT_INPUT",
  	name:"say",
  	description:"Says any reason",
  	options:[
  		{
  			type:"STRING",
  			name:"reason",
  			description:"Reason",
  			required:true
  		}
  	],
  	async callback(i){
  		await i.reply(i.options.getString("reason"))
  	}
  },{
  	type:1,
  	name:"clear",
  	description:"Deletes one or more messages",
  	options:[
      {
        type:"INTEGER",
        name:"amount",
        description:"Amount deleting messages",
      },{
      	type:"USER",
      	name:"member",
      	description:"Member to delete messages",
      }
  	],
    async callback(i){
      let amount = i.options.getInteger("amount")
      try {
        if(amount){
          await i.channel.bulkDelete(amount)
        }else{
          if(i.channel.lastMessage){
          	await i.channel.lastMessage.delete()
          } else {
          	await i.channel.bulkDelete(1)
          }
        }
        i.reply("Success")
        await wait(2000)
        i.deleteReply()
      } catch (err){
        i.reply("```\n"+err.stack+"```")
      }
    }
  },{
    name:"set",
  	type:"CHAT_INPUT",
  	description:"Commands for setting of this bot",
  	options:[
  	  {
  	  	type:"SUB_COMMAND",
  	  	name:"muterole",
  	  	description:"Sets the role used for mute",
  	  	options:[
  	  	  {
  	  		type:"ROLE",
  	  		name:"role",
  	  		required:true,
  	  		description:"Role used for mute"
  	  	  }
  	  	]
  	  }
  	],
  	async callback(i, data){
  	  let subcommand = i.options.getSubcommand()
  	  if(subcommand == "muterole"){
  	  	let role = i.options.getRole("role")
  	  	if(!role)i.reply("Дай мне роль!!!")
  	  	if(!data.guilds)data.guilds={};
  	  	let guildSettings = data.guilds[i.guild.id]
  	  	if(!guildSettings)
  	  	  guildSettings = data.guilds[i.guild.id] = {};
  	  	guildSettings.muteRole = role.id
  	  	i.reply("Mute role setted")
  	  	await wait(2000)
  	  	i.deleteReply()
  	  }
  	}
  }
]
// console.log("tools")

export { commands }
