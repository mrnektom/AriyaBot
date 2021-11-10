import { readdir } from "fs/promises"

let commList = [];
let scripts = await readdir(".")
scripts = scripts.filter( f => f.endsWith(".js")&&f !== "index.js")

for(let f of scripts){
  let { commands } = await import(`./${f}`);
  if(Array.isArray(commands)){
  	for(let c of commands){
  	  c.commands = commands;
  	}
  }
  
}

export { commList }
