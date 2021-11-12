import { Client, Intents } from "discord.js"
import { readFile } from "fs/promises"
let bot = new Client({
  intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
})
import { commList } from "./commands/index.js"
import readline from "readline"
let rl = readline.createInterface(process.stdin,process.stdout)
let config = await readFile("./config.json")
config = JSON.parse(config)

let ready = false


// console.log(commList)

bot.on("ready",async ()=>{
	console.log(bot.user.username);
	ready= true

	let guilds = await bot.guilds.fetch()
	
	let comms = await bot.application.commands.fetch()

	// console.log(comms)
	for(let [id, c] of comms){
		let comm = commList.find(elem=>elem.name===c.name?elem:undefined)
		if(comm && !c.equals(comm)){
			console.log(`Editing command: ${c.name}`)
			c.edit(comm)
		}else if(!comm){
			c.delete()
		}
	}

	comms = await bot.application.commands.fetch()

	for(let comm of commList){
		let c = comms.find(elem=>elem.name===comm.name)
		if(!c){
		    console.log(`Creating command: ${commName}`)
		    try {
		      await bot.application.commands.create(comm)
		    } catch (err){
		    	console.log(`Falling create command: ${comm.name}`)
		    	console.log(err)
		    }
		}
		// console.log(c)
	}
	
	// comms = await bot.application.commands.set(commList)
	// console.log(comms)
	/*let c = await bot.application.commands.create({
		name:"help",
		description:"Shows info"
	})
	console.log(c)*/
})

bot.on("messageCreate",msg => {
  
  
  if(msg.author.id!=bot.user.id){
  	// msg.channel.send(msg.content)
  }
})

bot.on("interactionCreate",async (i) => {
  if(i.isCommand){
    let c = commList.find(elem=>elem.name==i.commandName?elem:undefined)
    if(c){
      try {
      	c.callback(i)
      } catch (err){
      	console.error(err)
      	i.reply("```\nError:"+err+"```")
      }
    } else {
      i.reply("Command not found")
    }
  }
})

bot.login(config.token)

rl.on("line", async (line)=>{
	if(ready&&line!==""){
		let channel = await bot.channels.fetch("901091663844376576")
		channel.send(line.trim())
	}
})
