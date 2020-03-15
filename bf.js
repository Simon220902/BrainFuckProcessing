//import * as s from "/stack.js";

class Interpreter{
	constructor(program){
		this.tape = new Uint8Array(30000);
		this.tapeIndex = 0;
		this.program = program;
		this.programIndex = 0;
		this.loopStart = [];
		this.output = "";
		this.is_stepping = false;
		this.done = false;
	}
	reset(){
		this.tape = new Uint8Array(30000);
		this.tapeIndex = 0;
		this.programIndex = 0;
		this.loopStart = [];
		this.output = "";
		this.is_stepping = false;
	}
	eval(){
		if (this.is_stepping){
			this.reset();
		}
		for(;this.programIndex < this.program.length; this.programIndex++){
			let char = this.program[this.programIndex];
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
				default:
			  }
		}
	}
	step(){
		if (!this.is_stepping){
			this.reset();
			this.is_stepping=true;
		}
		else if(this.programIndex< this.program.length){
			
			let char = this.program[this.programIndex];
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
				default:
			}
			this.programIndex += 1;
		}
		else{
			this.done = true;
			this.is_stepping = false;
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
		this.output += String.fromCharCode(this.tape[this.tapeIndex]);
	}
	getChar(){
		let char = prompt('Which character do you want to insert at '+this.tapeIndex, '');
		while (char.length !== 1){
			char = prompt('Please insert a single character only '+this.tapeIndex, '');
		}
		this.tape[this.tapeIndex] = char.charCodeAt();
	}
	loopOpening(){
		if (this.tape[this.tapeIndex] !== 0){
			this.loopStart.push(this.programIndex);
		}else{
			this.programIndex = this.loopEnd(this.programIndex)+1;
		}
	}
	loopClosing(){
		if (this.tape[this.tapeIndex] === 0){
			this.loopStart.pop();
		}else{
			this.programIndex = this.loopStart[this.loopStart.length-1];
		}
	}
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

class InterpreterWithStack extends Interpreter{
	constructor(program){
		super(program);
		//Vi giver stacken objektet selv så den kan proppe ting på tapen
		this.stack = null;
	}
	//Det giver nok ikke så meget mening at have en eval, da man bliver nødt til at køre det i steps
	eval(){
		for(;this.programIndex < this.program.length; this.programIndex++){
			let char = this.program[this.programIndex];
			switch(char) {
				case "<":
					super.left();
					break;
				case ">":
					super.right();
					break;
				case "+":
					super.plus();
					break;
				case "-":
					super.minus();
					break;
				case ".":
					super.printChar();
					break;
				case ",":
					super.getChar();
					break;
				case "[":
					super.loopOpening();
					break;
				case "]":
					super.loopClosing();
					break;
				case ":":
					this.pushOPC(this.tape[this.tapeIndex]);
					break;
				case ";":
					this.pushARG(this.tape[this.tapeIndex]);
					break;
			}
		}
	}
	step(){
		if (!this.is_stepping){
			this.reset();
			this.is_stepping=true;
		}
		else if(this.programIndex < this.program.length){
			
			let char = this.program[this.programIndex];
			switch(char) {
				case "<":
					super.left();
					break;
				case ">":
					super.right();
					break;
				case "+":
					super.plus();
					break;
				case "-":
					super.minus();
					break;
				case ".":
					super.printChar();
					break;
				case ",":
					super.getChar();
					break;
				case "[":
					super.loopOpening();
					break;
				case "]":
					super.loopClosing();
					break;
				case ":":
					this.pushOPC(this.tape[this.tapeIndex]);
					break;
				case ";":
					this.pushARG(this.tape[this.tapeIndex]);
					break;
			}
			this.programIndex += 1;
		}
		else{
			this.done = true;
			this.is_stepping = false;
		}

	}
	pushOPC(){
		this.stack.pushOPC(this.tape[this.tapeIndex]);
	}
	pushARG(){
		this.stack.pushARG(this.tape[this.tapeIndex]);
	}

}