class Interpreter{
	constructor(program){
		this.tape = new Uint8Array(100);
		this.tapeIndex = this.tape.length/2;
		this.program = program;
		this.programIndex = 0;
		this.loopStart = [];
		this.outPut = "";
		this.iterations = 0;
	}

	eval(){
		for(;this.programIndex < this.program.length; this.programIndex++){
			let char = this.program[this.programIndex];
			//console.log(char);
			switch(char) {
				case "<":
				  this.left();
				  break;
				case ">":
					this.right();
					break;
				case "+":
					this.plus();
					break;
				case "-":
					this.minus();
					break;
				case ".":
					this.printChar();
					break;
				case ",":
					this.getChar();
					break;
				case "[":
					this.loopOpening();
					break;
				case "]":
					this.loopClosing();
					break;
				case ":":
					this.pushOPC();
					break;
				case ";":
					this.pushARG();
					break;
				default:
			  }
		}
	}
	left() {
		this.tapeIndex--;
	}
	right() {
		this.tapeIndex++;
	}
	plus(){
		this.tape[this.tapeIndex]++;
	}
	minus(){
		this.tape[this.tapeIndex]--;
	}
	printChar(){
		console.log(String.fromCharCode(this.tape[this.tapeIndex]));
		this.outPut += String.fromCharCode(this.tape[this.tapeIndex]);
	}
	getChar(){
		this.tape[tape.index] = String.charCodeAt(prompt('Insert char at'+this.tapeIndex, ''));
	}
	loopOpening(){
		if (this.tape[this.tapeIndex] !== 0){
			this.loopStart.push(this.programIndex);
		}else{
			this.programIndex = this.loopEnd(this.programIndex);
		}
	}
	loopClosing(){
		if (this.tape[this.tapeIndex] === 0){
			this.loopStart.pop();
		}else{
			this.iterations++;
			this.programIndex = this.loopStart[this.loopStart.length-1];
		}
	}
	pushOPC(){}
	pushARG(){}

	loopEnd(index){
		for (let iadd=0;iadd+index<this.program.length;iadd++){
			if (this.program[index+iadd]=="]"){
				return index+iadd;
			}else if(this.program[index+iadd]=="["){
				iadd = this.loopEnd(index+iadd);
			}
		}

	}
}

let helloWorldProgram = " ++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
let interp = new Interpreter(helloWorldProgram);
