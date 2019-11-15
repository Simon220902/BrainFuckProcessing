Brainfuck i og med processing
=======

## Ideén  

En brainfuck intrepreter lavet i processing med gode visualiseringer og stepthrough muligheder af eksikveringen af brainfuck koden.  
Derudover skal der være et brainfuck interface til processings tegne funktioner.  
Det skal ske gennem et stack, hvor man lægger en funktion på (i form af en opcode), der eksikveres når det rette antal argumenter er givet.  
Der vil være to forskellige operationer for at skubbe en opcode og et argument, da man også skal kunne bruge evaluerede opcodes til argument.

Jeg uvider derfor brainfucks operationssæt med to ¿CHARACTERS? nemlig : og ; hvor den første er pushOPCODE og den anden er pushARG.  

Her er en tabel over mulige opcodes med beskrivelse, argumenter, effekt og returnværdi.  

Opcode	|Funktion	|Argumenter	|Beskrivelse
---|---|---|---
0|	size|	width, height|		sæt skærm til width, height
1|	fillGrey|	greyscale|		sæt fill-farven med et argument mellem 0-255
2|	fill|	r,g,b|	sæt fill-farven med r,g,b værdier som argumenter
3|	backgroundGrey|	greyscale|	sæt baggrundsfarven med et argument mellem 0-255
4|	background|	r,g,b|	sæt baggrundsfarven med r,g,b værdier som argumenter
5|	rect|	x, y, w, h|	tegn et rektangel ved x, y som er w bredt og h højt
6|	circle|	x, y, r|	tegn en cirkel ved x, y med radius r
7|	line|	x1, y1, x2, y2|	tegn en linje mellem punktet x1, y1 og x2, y2



Her er en gif af hvordan jeg forestiller mig at stacken kommer til at fungere.  






![Image](Icon-pictures.png "icon")

Strikethrough:
~~stikethrough~~

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. lather
  2. rinse
  3. repeat

An [example](http://example.com).

![Image](Icon-pictures.png "icon")

> Markdown uses email-style  > characters for blockquoting.

Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.