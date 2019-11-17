/*
 > : index+1 (hvis tapen er længere end indeks, ellers skal den add en nyt i slutningen af listen)
 < : index-1 (hvis tapen er længere end indeks>0, ellers skal der indsættes et nyt int i starten af listen)
 
 + : tape[index]+=1;
 - : tape[index]-=1;
 
 . : print char;
 , : input char;
 
 [ :
 ] : 
 
 */

byte zero = 0;
byte one = 1;
class Interpreter {
  ArrayList<Byte> tape = new ArrayList<Byte>();
  byte[] tp = new byte[100]; 
  
  int index;
  Interpreter() {
    //prop 10 0'er ind i listen
    for (int i = 0; i< 10; i++) {
      this.tape.add(i, zero);
    }
    index = int(tape.size()/2);
  }
  void left(){
    
  }
  void right(){}
  void plus(){}
  void minus(){}
  void moveLeft() {
    if (index >= 1) {
      index--;
    } else {
      tape.add(0, zero);
    }
  }

  void moveRight() {
    if (index < tape.size()-1 ) {
      index++;
    } else {
      index++;
      tape.add(index, zero);
    }
  }
  
  void plus(){    
    tape.set(index, byte(tape.get(index)+one));
  }
  void parse(){}
 /* void loop(){
    while (tape.get(index)>0b00000000){
    
    }
  }*/
  
}
