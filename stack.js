class Operation{
	constructor(func, num_of_args, returns_anything){
		this.function = func;    
		this.num_of_args = num_of_args;
		this.returns_anything = returns_anything;
		this.args = [];
	}

	exec(arg){
		if (this.args.length < this.num_of_args){
			this.args.push(arg);
		} else if(this.args.length === this.num_of_args){
			if (this.returns_anything){
				return this.function(...this.args);
			}else{
				this.function(...this.args);
		}} else if(true){
			throw "Exceeded arguments";
		}
		//Så vi ved hvis den er nul, så har funktionen ikke fået det nødvendige antal argumenter og er dermed ikke blevet eksikveret
		return null;

	}
}

class TempStringOperation extends Operation{
	constructor(){
		//En tom funktion fordi dette er et speciel case vi håndtere i exec metoden
		super.returns_anything = true;
		this.s = "";
	}
	exec(arg){
		if (arg == 0){
			//Den tidligere streng 
			let previous_s = this.s;
			//Vi "genstarter" streng værdien når den skal returneres
			this.s = "";
			return this.s;
		}else{
			this.s.concat(String.fromCharCode(arg));
		}
		return null;
	}
}

let operations = {0: new Operation(resizeCanvas, 2, false),
				  1: new Operation(fill, 1, false),
				  2: new Operation(fill, 3, false,),
				  3: new Operation(background, 1, false),
				  4: new Operation(background, 3, false),
				  5: new Operation(rect, 4, false),
				  6: new Operation(circle, 3, false),
				  7: new Operation(line, 4, false),
				  8: new Operation(text, 3, false),
				  9: new Operation(()=>keyIsPressed, 0, true),
				  10: new Operation(()=>key, 0, true),
				  11: new Operation(()=>keyCode, 0, true),
				  12: new Operation(()=>mouseIsPressed, 0, true),
				  13: new Operation(()=>mouseX, 0, true),
				  14: new Operation(()=>mouseY, 0, true),
				  15: new Operation((a, b)=>a*b, 2, true),
				  16: new Operation((a, b)=>a/b, 2, true),
				  17: new Operation((a, b)=>a+b, 2, true),
				  18: new Operation((a, b)=>a-b, 2, true),
				  19: new TempStringOperation()}//something with the tempstring, true)}		

class Stack{
	constructor(){
		this.stack = [];
		this.lastOpcI = null;
	}
	pushOpc(opc){
		this.stack.push(operations[opc]);
	}
	pushArg(arg){
		if (this.stack[-1].returns_anything){
			let returned = this.stack[-1].exec(arg);
			if (returned !== null){
				this.pushArg(returned);
			}
		}else{
			this.stack[-1].exec(arg);
		}
	}
}
