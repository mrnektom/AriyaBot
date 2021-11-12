import { readdir } from "fs/promises"
import path from "path"

let commList = [];
let scripts = await readdir(path.parse(new URL(import.meta.url).pathname).dir)
scripts = scripts.filter( f => f.endsWith(".js")&&f !== "index.js")


for(let f of scripts){
  let { commands } = await import(`./${f}`);
  if(Array.isArray(commands)){
  	for(let c of commands){
  	  c.commands = commands;
  	  commList.push(c)
  	}
  }
  
}

export { commList }
