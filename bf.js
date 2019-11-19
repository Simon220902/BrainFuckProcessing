class Interpreter{
	constructor(program){
		this.tape = new Uint8Array(100);
		this.tapeIndex = this.tape.length/2;
		this.program = program;
		this.programIndex = 0;
		this.loopStart = [];
		this.output = "";
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
