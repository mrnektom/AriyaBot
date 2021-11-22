


const commands = []

commands.push({
  type:"CHAT_INPUT",
  name:"mute",
  description:"Mutes some member",
  options:[
  	{
  	  type:"USER",
  	  name:"member",
  	  required:true,
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
  	  required:true,
  	  description:"Member of warns"
  	},{
  	  type:"STRING",
  	  name:"duration",
  	  description:"Duration of this warn"
  	},{
  	  type:"STRING",
  	  name:"cause",
  	  description:"Cause of this warn"
  	}
  ],
  async callback(i, data){//warn command
    let warns = data.guilds[i.guild.id].warns;
    let member = i.options.getUser("member")
    let duration = parseFloat(i.options.getString("duration"))
    let dur = duration!=NaN?duration:Infinity;
    let durUnit = duration.replace(dur,"");
    let cause = i.options.getString("cause")
    if("y" == durUnit) {
      dur = dur * 365 * 24 * 60 * 60 * 1000;
    } else if("m" == durUnit) {
      dur = dur * 30 * 24 * 60 * 60 * 1000;
    } else if("w" == durUnit) {
      dur = dur * 7 * 24 * 60 * 60 * 1000;
    } else if(durUnit == "d") {
      dur = dur * 24 * 60 * 60 * 1000;
    } else if(durUnit == "h") {
      dur = dur * 60 * 60 * 1000;
    } else if(durUnit == "min") {
      dur = dur * 60 * 1000;
    } else {
      dur = dur * 1000;
    }
    let uw
    if(member.id in warns){
      uw = warns[member.id]
    } else {
      uw = warns[member.id] = []
    }
    uw.push({
      timestamp:Date.now()+dur,
      duration:dur,
      cause:cause
    })
    setTimeout(()=>{
      let now = Date.now()
      warns[memder.id] = uw.filter((e)=>e.timestamp>now)
    },dur)
  }
})

commands.push({
  name:"warns",
  type:"CHAT_INPUT",
  description:"Shows warns of any member or you",
  options:[
  	{
  	  type:"USER",
  	  name:"member",
  	  description:"Member"
  	}
  ]
})

export { commands }
