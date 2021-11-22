

function ObjectGenerator(data){
  if(this instanceof ObjectGenerator)return;

  return new Proxy(data,{
  	get(target, name, reciver){
  	  if(name == "toJSON"){
  	  	return ()=> data;
  	  }
  	  if(name in data){
  	    let value = data[name]
  	    if(value == null || typeof value !== "object" || typeof value!== "function"){
  	    	return value;
  	    } else {
  	      return ObjectGenerator(value)
  	    }
  	  } else {
  	  	let value = {}
  	  	data[name] = value
  	  	return ObjectGenerator(value)
  	  }
  	}
  })
}

export { ObjectGenerator }
