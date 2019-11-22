Brainfuck med p5.js
=======

## Ideén  

Bestanddele  
* Brainfuck interpreter  
  * Selve fortolkeren  
  * Stepthrough værktøjer m.m.  
* Funktions stack evaluator  
  * Selve evaluerings mekanismen  
  * De individuelle opcodes  

En brainfuck intrepreter lavet i p5 med gode visualiseringer og stepthrough muligheder af eksikveringen af brainfuck koden. Det ville gøre jeg kunne hoste det som en github.io side og det ville være nemmere at have et rent tekst input felt med koden. Derudover kunne man også give den nødvendige forklaring i noget ovenstående html osv.

Derudover skal der være et brainfuck interface til p5s tegne funktioner.  
Det skal ske gennem et stack, hvor man lægger en funktion på (i form af en opcode), der eksikveres når det rette antal argumenter er givet.  
Der vil være to forskellige operationer for at skubbe en opcode og et argument, da man også skal kunne bruge evaluerede opcodes til argument.

Jeg udvider derfor brainfucks operationssæt med to symboler nemlig : og ; hvor den første er pushOPCODE og den anden er pushARG.

Her er en tabel over mulige opcodes med beskrivelse, argumenter, effekt og returnværdi.  

Opcode	|Funktion	|Argumenter |Returnværdi	|Beskrivelse
---|---|---|---|---
0|	resizeCanvas|	width, height| Intet|	sæt skærm til width, height (Default værdi 255x255)
1|	fillGrey|	greyscale| Intet|		sæt fill-farven med et argument mellem 0-255
2|	fill|	r,g,b| Intet|	sæt fill-farven med r,g,b værdier som argumenter
3|	backgroundGrey|	greyscale | Intet|	sæt baggrundsfarven med et argument mellem 0-255
4|	background|	r,g,b | Intet|	sæt baggrundsfarven med r,g,b værdier som argumenter
5|	rect|	x, y, w, h | Intet|	tegn et rektangel ved x, y som er w bredt og h højt
6|	circle|	x, y, d | Intet|	tegn en cirkel ved x, y med diameter d
7|	line|	x1, y1, x2, y2 | Intet|	tegn en linje mellem punktet x1, y1 og x2, y2
8|	text| string, x, y| Intet|	tegn en linje mellem punktet x1, y1 og x2, y2
9|  keyIsPressed| Intet| if(keyIsPressed){tape[i]=1}else{tape[i]=0} | om der bliver trykket på en tast lige nu
10|  key| Intet| tape[i]=key| sætter den aktuelle celle til værdien af den sidste tast, der blev trykket på (kun ascii-værdierne)
11| keyCode| Intet| tape[i]=keyCode| sætter den aktuelle celle til værdien af den sidste speciel tast, der blev trykket på, værdierne kan ses nedenunder
12|  mouseIsPressed| Intet| if(mouseIsPressed){tape[i]=1}else{tape[i]=0} | om der bliver klikket med musen lige nu
13|  mouseX| Intet| tape[i]=mouseX| sætter den aktuelle celle til musens x værdi
14| mouseY| Intet| tape[i]=mouseY| sætter den aktuelle celle til musens y værdi
15| *| a, b| stack: a*b| Når dette er evalueret vil dette fungere som et argument
16| / | a, b| stack: a/b| Når dette er evalueret vil dette fungere som et argument
17| +| a, b| stack: a+b| Når dette er evalueret vil dette fungere som et argument
18| -| a, b| stack: a-b| Når dette er evalueret vil dette fungere som et argument
19|	give string as arg|	ascii-value of char until char equals 0 | if(char!==0){string+=char}else{stack: string}|	Den tager en char der pushes som argument indtil char er lig 0 (som er et lidt meningsløst ascii-symbol)

Her er nogle af de vigtige værdier for keyCode:
For en fuld liste af alle keyCode værdier [kan findes her](http://keycode.info/)
<table>
      <thead>
        <tr>
          <th>Key Code</th>
          <th>Key</th>
        </tr>
      </thead>
      <tbody>
      <tr><td>0</td><td>That key has no keycode</tr><tr><td>8</td><td>backspace / delete</tr><tr><td>13</td><td>enter</td></tr><tr><td>16</td><td>shift</td></tr><tr><td>32</td><td>spacebar</td></tr><tr><td>37</td><td>left arrow</td></tr><tr><td>38</td><td>up arrow</td></tr><tr><td>39</td><td>right arrow</td></tr><tr><td>40</td><td>down arrow</td></tr><tr><td>48</td><td>0</td></tr><tr><td>49</td><td>1</td></tr><tr><td>50</td><td>2</td></tr><tr><td>51</td><td>3</td></tr><tr><td>52</td><td>4</td></tr><tr><td>53</td><td>5</td></tr><tr><td>54</td><td>6</td></tr><tr><td>55</td><td>7</td></tr><tr><td>56</td><td>8</td></tr><tr><td>57</td><td>9</td></tr><tr><td>65</td><td>a</td></tr><tr><td>66</td><td>b</td></tr><tr><td>67</td><td>c</td></tr><tr><td>68</td><td>d</td></tr><tr><td>69</td><td>e</td></tr><tr><td>70</td><td>f</td></tr><tr><td>71</td><td>g</td></tr><tr><td>72</td><td>h</td></tr><tr><td>73</td><td>i</td></tr><tr><td>74</td><td>j</td></tr><tr><td>75</td><td>k</td></tr><tr><td>76</td><td>l</td></tr><tr><td>77</td><td>m</td></tr><tr><td>78</td><td>n</td></tr><tr><td>79</td><td>o</td></tr><tr><td>80</td><td>p</td></tr><tr><td>81</td><td>q</td></tr><tr><td>82</td><td>r</td></tr><tr><td>83</td><td>s</td></tr><tr><td>84</td><td>t</td></tr><tr><td>85</td><td>u</td></tr><tr><td>86</td><td>v</td></tr><tr><td>87</td><td>w</td></tr><tr><td>88</td><td>x</td></tr><tr><td>89</td><td>y</td></tr><tr><td>90</td><td>z</td></td></tr></tbody>
</table>

Her er et billede af hvordan jeg forestiller mig at stacken kommer til at fungere.  
![](stack.png)

Ligesom der i p5 er en draw funktion, man kan køre igen og igen tror jeg det også må være essentielt at få lavet et uendeligt loop i BF (altså den må ikke bare timeoute (man kunne sige hvis der var en opcode i et loop, så var der ingen bund) og da det er client-side skal vi ikke være bange for nogle kæmpe hosting regninger)

For at demonstrerer yderligere tænker jeg muligvis at lave en bf version af pong, hvis det kan lade sig gøre