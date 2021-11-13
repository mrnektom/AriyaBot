

function ObjectGenerator(data){
  if(this instanceof ObjectGenerator)return;

  return new Proxy(()=>{},{
  	get(target, name, reciver){
  	  
  	}
  })
}

export { ObjectGenerator }
