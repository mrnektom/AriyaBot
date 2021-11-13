import { readdir } from "fs/promises"
import path from "path"
const errors = [];
let commList = [];
let scripts = await readdir(path.parse(new URL(import.meta.url).pathname).dir)
scripts = scripts.filter( f => f.endsWith(".js")&&f !== "index.js")


for(let f of scripts){
  try {
    let { commands } = await import(`./${f}`);
    if(Array.isArray(commands)){
  	  for(let c of commands){
  	    c.commands = commList;
  	    c.category = path.parse(f).name
  	    commList.push(c)
  	  }
    }
  } catch (err){
  	errors.push(err)
  }
  
}


export { commList, errors }
