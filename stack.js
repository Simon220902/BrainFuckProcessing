class Operation{
    constructor(func, num_of_args, returns_anything, returns_anything=null){
        this.function = func;    
        this.num_of_args = num_of_args;
        //Boolean if it returns anything
        this.returns_anything = returns_anything;
        if(this.returns_anything){
            this.return_type = returns_anything;
        }
    }
    exec(arg_list){
        
    } 
}

class Argument{
    constructor(value){
        this.value = value;
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
                  8: new Operation(()=>keyIsPressed, 0, true, SOME_RETURN_TYPE),
                  9: new Operation(()=>key, 0, true, SOME_RETURN_TYPE),
                  10: new Operation(()=>keyCode, 0, true, SOME_RETURN_TYPE),
                  11: new Operation(()=>mouseIsPressed, 0, true, SOME_RETURN_TYPE),
                  12: new Operation(()=>mouseX, 0, true, SOME_RETURN_TYPE),
                  13: new Operation(()=>mouseY, 0, true, SOME_RETURN_TYPE),
                  14: new Operation((a, b)=>a*b, 2, true, SOME_RETURN_TYPE),
                  15: new Operation((a, b)=>a/b, 2, true, SOME_RETURN_TYPE),
                  16: new Operation((a, b)=>a+b, 2, true, SOME_RETURN_TYPE),
                  17: new Operation((a, b)=>a-b, 2, true, SOME_RETURN_TYPE)}

class Stack{
    constructor(){
        this.stack = [];
    }

}
