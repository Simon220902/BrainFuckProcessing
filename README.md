Brainfuck med p5.js
=======

Et link til projektet indtil videre: [kan findes her](https://simon220902.github.io/BrainFuckProcessing/)

## Ideén  

Bestanddele  
* Brainfuck interpreter  
  * Selve fortolkeren  
  * Stepthrough værktøjer m.m.  
* Funktions stack evaluator  
  * Selve evaluerings mekanismen  
  * De individuelle opcodes  

# Kort sagt:
En måde at kunne lave programmer med et grafisk element i [BrainFuck](https://da.wikipedia.org/wiki/Brainfuck).

# Lidt mere kompliceret:
Projektet består af en BrainFuck fortolker skrevet i JavaScript. Måden det grafiske etableres er ved at der findes en stack af operationer, der afvikles som de skubbes på. Det der skubbes på stacken er værdien fra tabellen af tal (med en række), der svarer til funktioner i P5 (opcodes) eller argumenter. Det traditionelle BrainFuck operator sæt (der kun består af otte symboler) er udvidet med **:** og **;**, som henholdsvis betyder pushOPCODE og pushARG. En liste over opcodesne kan ses længere nede.

Her er en tabel over mulige opcodes med beskrivelse, argumenter, effekt og returnværdi.  
Opcode	|Funktion	|Argumenter |Returnværdi	|Beskrivelse
---|---|---|---|---
0|	resizeCanvas|	width, height| Intet|	Sæt skærm til width, height (Default værdi 255x255)
1|	fillGrey|	greyscale| Intet|		Sæt fill-farven med et argument mellem 0-255
2|	fill|	r,g,b| Intet|	Sæt fill-farven med r,g,b værdier som argumenter
3|	backgroundGrey|	greyscale | Intet|	Sæt baggrundsfarven med et argument mellem 0-255
4|	background|	r,g,b | Intet|	Sæt baggrundsfarven med r,g,b værdier som argumenter
5|	rect|	x, y, w, h | Intet|	Tegn et rektangel ved x, y som er w bredt og h højt
6|	circle|	x, y, d | Intet|	Tegn en cirkel ved x, y med diameter d
7|	triangle|	x1, y1, x2, y2, x3, y3 | Intet|	Tegn en trekant mellem punkterne x1, y1 og x2, y2 og x3, y3
8|  keyIsPressed| Intet| tape[tapeIndex] = keyIsPressed | Om der bliver trykket på en tast lige nu. Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.
9|  key| Intet| tape[tapeIndex] = key|  Hvilkle tast der blev trykket på (kun ascii-værdierne). Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.
10| keyCode| Intet| tape[tapeIndex] = keyCode| Værdien af en speciel tast, der blev trykket på, værdierne kan ses nedenunder i tabellen over keyCodes. Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.
11|  mouseIsPressed| Intet|tape[tapeIndex] = mouseIsPressed | Om der bliver klikket med musen lige nu. Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.
12|  mouseX| Intet| tape[tapeIndex] = mouseX| Musens X-koordinat. Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.
13| mouseY| Intet| tape[tapeIndex] = mouseY| Musens Y-koordinat. Når dette er evalueret vil værdien sættes på det nuværende sted på tapen.

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
