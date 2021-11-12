
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
  },
  {
  	type:1,
  	name:"clear",
  	description:"Deletes one or more messages",
  	options:[
      {
        type:"INTEGER",
        name:"amount",
        description:"Amount deleting messages",
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
          	let msg = await i.channel.messages.fetch({limit:1})
          	// console.log(msg)
          	await msg.first().delete()
          }
        }
        i.reply("Success")
        setTimeout(()=>{
        	i.deleteReply()
        },2000)
      } catch (err){
        i.reply("```\n"+err.stack+"```")
      }
    }
  }
]
// console.log("tools")

export { commands }
