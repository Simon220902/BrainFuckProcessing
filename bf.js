let tape = new Uint8Array(100);
tape[0] += 17;
console.log(tape[0]);

class Interpreter{
    constructor(){
        this.tape = new Uint8Array(100);
        this.tapeIndex = int(this.tape.length/2);
        this.loopsStarted = 0;
    }

    eval(program){
        for(char in program){
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
        this.tape[this.tapeIndex]++;
    }
    printChar(){
        console.log(String.fromCharCode(this.tape[this.tapeIndex]));
    }
    getChar(){
        this.tape[tape.index] = String.charCodeAt(prompt('Insert char at'+this.tapeIndex, ''));
    }
    loopOpening(){}
    loopClosing(){}
    pushOPC(){}
    pushARG(){}
}