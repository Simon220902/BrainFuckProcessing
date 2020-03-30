class Interpreter{
	constructor(program){
		//Vores tape består af 30000 8 bit unsigned ints
		this.tape = new Uint8Array(30000);
		this.tapeIndex = 0;
		//Vores program er bare en lang streng, der også indeholder symboler som intet gør
		this.program = program;
		this.programIndex = 0;
		//Loopstart bruges til at gemme indekset i programmet hvor løkker starter
		this.loopStart = [];
		//Outputtet fra programmet, der kommer fra "." symbolet gemmes i denne streng
		this.output = "";
		//Om den er i gang med gå trinvist igennem programmet
		this.is_stepping = false;
		//Om programmet er færdig med at køre
		this.done = false;
	}
	reset(){
		//Vi resetter de nødvendige variablers værdier så programmet kan køre igen
		this.tape = new Uint8Array(30000);
		this.tapeIndex = 0;
		this.programIndex = 0;
		this.loopStart = [];
		this.output = "";
		this.is_stepping = false;
	}
	eval(){
		//Eval funktionen kører hele programmet.
		//Hvis interpreteren er igang med en trinvis gennemgang resettes værdierne så den er klar til at køre programmet hele vejen igennem.
		if (this.is_stepping){
			this.reset();
		}
		//For hver karakter i strengen, this.programIndex anvendes da det er denne pointer vi manipulere ift. håndteringen af løkker
		for(;this.programIndex < this.program.length; this.programIndex++){
			switch(this.program[this.programIndex]) {
				//Et case for hver af de BF symboler
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
		//Step funktionen kører kun et enkelt trin, hver gang den bliver kaldt, altså kun et symbol.
		//Hvis programmet ikke er igang med en trinvis gennemgang, resetter vi interpreteren og sætter den til at være igang
		if (!this.is_stepping){
			this.reset();
			this.is_stepping=true;
		}
		//Så længe der er program tilovers
		else if(this.programIndex< this.program.length){
			//Har vi samme switch case for hver af BF symbolerne
			switch(this.program[this.programIndex]) {
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
			//Vi tager det næste symbol
			this.programIndex += 1;
		}
		//Hvis der ikke er mere program tilovers er programmet færdigt, vi sætter værdien done til true og sætter til ikke at være igang med en trinvisgennemgang
		else{
			this.done = true;
			this.is_stepping = false;
		}
	}
	//Herunder kommer funktionerne tilknyttet til hver af BF symboler
	//Tilsvarende BF symbol: <
	left(){
		this.tapeIndex--;
	}
	//Tilsvarende BF symbol: >
	right(){
		this.tapeIndex++;
	}
	//Tilsvarende BF symbol: +
	plus(){
		this.tape[this.tapeIndex]++;
	}
	//Tilsvarende BF symbol: -
	minus(){
		this.tape[this.tapeIndex]--;
	}
	//Tilsvarende BF symbol: .
	printChar(){
		//Vi tilføjer værdien på tapen som et ASCII symbol til output strengen
		this.output += String.fromCharCode(this.tape[this.tapeIndex]);
	}
	//Tilsvarende BF symbol: ,
	getChar(){
		//Vi får et input via en prompt
		let char = prompt('Which character do you want to insert at '+this.tapeIndex, '');
		//Vi sørger for at inputtet kun er en karakter lang og bliver ved med at spørge til vi får et input, der kun er en karakter lang
		while (char.length !== 1){
			char = prompt('Please insert a single character only '+this.tapeIndex, '');
		}
		//Når inputtet er en karakter langt, sætter vi den tilsvarende ASCII værdi ind på den nuværende plads på tapen
		this.tape[this.tapeIndex] = char.charCodeAt();
	}
	//Tilsvarende BF symbol: [
	loopOpening(){
		//Hvis værdien på den nuværende plads på tapen ikke er nul og loopet skal køre
		if (this.tape[this.tapeIndex] !== 0){

			//Tilføjer vi programindekset til loopStart listen, der virker som en stack, hvor det nyeste loop åbning kommer til at ligge øverst
			this.loopStart.push(this.programIndex);
		}else{
			//Hvis værdien på den nuværende plads på tapen er nul, skal loopet ikke køre, så vi finder, der hvor loopet stopper og sætter det til vores program index
			this.programIndex = this.loopEnd(this.programIndex)+1;
		}
	}
	//Tilsvarende BF symbol: ]
	loopClosing(){
		//Hvis værdien på den nuværende plads på tapen er nul og loopet er færdigt
		if (this.tape[this.tapeIndex] === 0){
			//Tager vi loopets start index af loopStart listen
			this.loopStart.pop();
		}else{
			//Ellers skal vi rykke vores programIndex tilbage til loopets start
			this.programIndex = this.loopStart[this.loopStart.length-1];
		}
	}
	//Hjælpefunktion til loopOpening
	loopEnd(index){
		//Denne hjælpefunktion finder et loops matchende slutning, det betyder altså også at den skal kunne håndtere loops inden i det første loop
		//For alle de resterende karaktere i program strengen, vi slutter loopet hvis det ønskede resultat findes
		for (let iadd=1;iadd+index<this.program.length;iadd++){
			//Hvis der er en loop slutning så returnere vi det nye index
			if (this.program[index+iadd]=="]"){
				return index+iadd;
			}//Hvis et nyt loop åbnes kalder vi funktionen igen, hvor vi finder slutningen på det nye åbnede loop
			else if(this.program[index+iadd]=="["){
				//Da loopEnd funktionen returnere index+iadd og vi kun er interesseret i iadd værdien trækker vi index fra.
				iadd = this.loopEnd(index+iadd)-index;
			}
		}
	}
}

class InterpreterWithStack extends Interpreter{
	constructor(program){
		//Da denne klasse er nedarvet af Interpreteren kalder vi interpreteren constructor med programmet
		super(program);
		//Den grafiske stack er det der er forskellen på denne underklasse så vi laver en instans af Stack klassen
		//Vi giver stacken objektet selv så den kan proppe ting på tapen
		this.stack = new Stack(this);
	}
	//Det samme som i Interpreter bare med to nye symboler ":" og ";"
	eval(){
		for(;this.programIndex < this.program.length; this.programIndex++){
			switch(this.program[this.programIndex]) {
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
	//Det samme som i Interpreter bare med to nye symboler ":" og ";"
	step(){
		if (!this.is_stepping){
			this.reset();
			this.is_stepping=true;
		}
		else if(this.programIndex < this.program.length){
			switch(this.program[this.programIndex]) {
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
					this.pushOPC();
					break;
				case ";":
					this.pushARG();
					break;
			}
			this.programIndex += 1;
		}
		else{
			this.done = true;
			this.is_stepping = false;
		}
	}
	//Tilsvarende vores grafiske BF symbol: :
	pushOPC(){
		//Vi bruger stackens metode hvor vi skubber værdien på den nuværende plads i tapen
		this.stack.pushOPC(this.tape[this.tapeIndex]);
	}
	//Tilsvarende vores grafiske BF symbol: ;
	pushARG(){
		//Vi bruger stackens metode hvor vi skubber værdien på den nuværende plads i tapen
		this.stack.pushARG(this.tape[this.tapeIndex]);
	}
}