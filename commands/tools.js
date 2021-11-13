
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
    options:[
      {
      	name:"command",
      	type:"STRING",
      	description:"Help for this command"
      }
    ],
    async callback(i){
      let r = []
      let comms = commands[0].commands.sort((a,b)=>{
      	if(a.category == b.category){
      	  if(a.name==b.name)return 0;
      	  else if(a.name < b.name)return -1;
      	  else return 1;
      	} else if(a.category < b.category)return -1;
      	else return 1;
      })
      r.push("```\n")
      let tc = null
      for(let c of comms){
      	if(!c || !c.name)continue;
      	if(c.category!=tc){
      	  tc = c.category
      	  r.push(c.category+":\n")
      	}
      	r.push("  "+c.name + " ")
      	for(let option of c.options){
      	  if(option.required){
      	    r.push(`<${option.name}> `)
      	  }else{
      	  	r.push(`[${option.name}] `)
      	  }
      	}
      	r.push("\n    "+c?.description + "\n\n")
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
