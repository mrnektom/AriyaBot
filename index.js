import { Client, Intents } from "discord.js";
let bot = new Client({
  intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
})
import config from "./config.mjs"
import readline from "readline"
let rl = readline.createInterface(process.stdin,process.stdout)
import { commList } from "./commands/index.mjs"

let ready = false




bot.on("ready",async ()=>{
	console.log(bot.user.username);
	ready= true

	let guilds = await bot.guilds.fetch()
	// console.log(guilds)
	bot.application?.commands.set(commList)
})

bot.on("messageCreate",msg => {
  
  
  if(msg.author.id!=bot.user.id){
  	// msg.channel.send(msg.content)
  }
})

bot.on("interactionCreate",async (i) => {
	console.log(i)
	
	if(!i.isCommand())return;
	if(i.commandName=="help"){
		console.log("Help")
		await i.reply("This is a help command!");
		console.log("Replied")
	}
})

await bot.login(config.token)

rl.on("line", async (line)=>{
	if(ready&&line!==""){
		let channel = await bot.channels.fetch("901091663844376576")
		channel.send(line.trim())
	}
})
