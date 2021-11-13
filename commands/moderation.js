


const commands = []

commands.push({
  type:"CHAT_INPUT",
  name:"mute",
  description:"Mutes some member",
  options:[
  	{
  	  type:"USER",
  	  name:"member",
  	  description:"Member for mute"
  	},{
  	  type:"STRING",
  	  name:"duration",
  	  description:"Duration for mute"
  	},{
  	  type:"STRING",
  	  name:"cause",
  	  description:"Cause of this mute"
  	}
  ],
  async callback(i,data){
  	i.reply("$")
  }
})

commands.push({
  type:"CHAT_INPUT",
  name:"warn",
  description:"Warns some member",
  options:[
  	{
  	  type:"USER",
  	  name:"member",
  	  description:"Member for warns"
  	},{
  	  type:"STRING",
  	  name:"duration",
  	  description:"Duration for this warn"
  	},{
  	  type:"STRING",
  	  name:"cause",
  	  description:"Cause for this warn"
  	}
  ],
  async callback(i, data){
    let guilds = data.guilds;
  	if(!guilds){
  	  data.guilds = guilds = {
  	  	[i.guild.id]:{
  	  	  warns:{}
  	  	}
  	  };
  	}
  	let guild = guilds[i.guild.id]
  	if(!guild){
  	  guilds[i.guild.id] = guild = {
  	  	warns:{}
  	  }
  	}
  	if(!guild.warns){
  	  guild.warns = {};
  	}
  	let warns = guild.warns;
  	i.reply("ok")
  }
})

export { commands }
