Brainfuck med p5.js (FORTH)
=======
For det rigtige projekts readme se [her](https://github.com/Simon220902/BrainFuckProcessing)

Herunder vil jeg tale lidt om mine ideer til at udvide stacken til et lidt Forth inspireret system.
For at gøre den mere transportabel kan man give en dictionary af tegneoperationerne. 
Derudover skal resultaterne blive på stacken, derfra skal man kunne poppe dem ned på tapen eller anvende dem som argumenter til den næste opcode.
Det betyder at vi så bruger omvendt polsk notation altså (ARG ARG ARG OPC) istedet for (OPC ARG ARG ARG). Dette giver os også muligheden for at have en lang række andre OPCODES så man f.eks. kan plusse, gange.... med langt større tal end hvad bf kan håndtere. Derudover kan man måske også få implementeret en måde at lave brugerdefinerede funktioner gennem BF. Det kaldes faktorering som beskrives [her](https://users.ece.cmu.edu/~koopman/forth/hopl.html).