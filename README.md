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

Jeg uvider derfor brainfucks operationssæt med to symboler nemlig : og ; hvor den første er pushOPCODE og den anden er pushARG.

Her er en tabel over mulige opcodes med beskrivelse, argumenter, effekt og returnværdi.  

Opcode	|Funktion	|Argumenter |Returnværdi	|Beskrivelse
---|---|---|---|---
0|	resizeCanvas|	width, height| Intet|	sæt skærm til width, height (Default værdi 500x500)
1|	fillGrey|	greyscale| Intet|		sæt fill-farven med et argument mellem 0-255
2|	fill|	r,g,b| Intet|	sæt fill-farven med r,g,b værdier som argumenter
3|	backgroundGrey|	greyscale | Intet|	sæt baggrundsfarven med et argument mellem 0-255
4|	background|	r,g,b | Intet|	sæt baggrundsfarven med r,g,b værdier som argumenter
5|	rect|	x, y, w, h | Intet|	tegn et rektangel ved x, y som er w bredt og h højt
6|	circle|	x, y, r | Intet|	tegn en cirkel ved x, y med radius r
7|	line|	x1, y1, x2, y2 | Intet|	tegn en linje mellem punktet x1, y1 og x2, y2
8|  keyIsPressed| Intet| if(keyIsPressed){tape[i]=1}else{tape[i]=0} | om der bliver trykket på en tast lige nu
9|  key| Intet| tape[i]=key| sætter den aktuelle celle til værdien af den sidste tast, der blev trykket på (kun ascii-værdierne)
10| keyCode| Intet| tape[i]=keyCode| sætter den aktuelle celle til værdien af den sidste speciel tast, der blev trykket på, værdierne kan ses nedenunder

<table>
      <thead>
        <tr>
          <th>Key Code</th>
          <th>Key</th>
        </tr>
      </thead>
      <tbody>
      <tr><td>0</td><td>That key has no keycode</td></tr><tr><td>3</td><td>break</td></tr><tr><td>8</td><td>backspace / delete</td></tr><tr><td>9</td><td>tab</td></tr><tr><td>12</td><td>clear</td></tr><tr><td>13</td><td>enter</td></tr><tr><td>16</td><td>shift</td></tr><tr><td>17</td><td>ctrl</td></tr><tr><td>18</td><td>alt</td></tr><tr><td>19</td><td>pause/break</td></tr><tr><td>20</td><td>caps lock</td></tr><tr><td>21</td><td>hangul</td></tr><tr><td>25</td><td>hanja</td></tr><tr><td>27</td><td>escape</td></tr><tr><td>28</td><td>conversion</td></tr><tr><td>29</td><td>non-conversion</td></tr><tr><td>32</td><td>spacebar</td></tr><tr><td>33</td><td>page up</td></tr><tr><td>34</td><td>page down</td></tr><tr><td>35</td><td>end</td></tr><tr><td>36</td><td>home</td></tr><tr><td>37</td><td>left arrow</td></tr><tr><td>38</td><td>up arrow</td></tr><tr><td>39</td><td>right arrow</td></tr><tr><td>40</td><td>down arrow</td></tr><tr><td>41</td><td>select</td></tr><tr><td>42</td><td>print</td></tr><tr><td>43</td><td>execute</td></tr><tr><td>44</td><td>Print Screen</td></tr><tr><td>45</td><td>insert</td></tr><tr><td>46</td><td>delete</td></tr><tr><td>47</td><td>help</td></tr><tr><td>48</td><td>0</td></tr><tr><td>49</td><td>1</td></tr><tr><td>50</td><td>2</td></tr><tr><td>51</td><td>3</td></tr><tr><td>52</td><td>4</td></tr><tr><td>53</td><td>5</td></tr><tr><td>54</td><td>6</td></tr><tr><td>55</td><td>7</td></tr><tr><td>56</td><td>8</td></tr><tr><td>57</td><td>9</td></tr><tr><td>58</td><td>:</td></tr><tr><td>59</td><td>semicolon (firefox), equals</td></tr><tr><td>60</td><td>&lt;</td></tr><tr><td>61</td><td>equals (firefox)</td></tr><tr><td>63</td><td>ß</td></tr><tr><td>64</td><td>@ (firefox)</td></tr><tr><td>65</td><td>a</td></tr><tr><td>66</td><td>b</td></tr><tr><td>67</td><td>c</td></tr><tr><td>68</td><td>d</td></tr><tr><td>69</td><td>e</td></tr><tr><td>70</td><td>f</td></tr><tr><td>71</td><td>g</td></tr><tr><td>72</td><td>h</td></tr><tr><td>73</td><td>i</td></tr><tr><td>74</td><td>j</td></tr><tr><td>75</td><td>k</td></tr><tr><td>76</td><td>l</td></tr><tr><td>77</td><td>m</td></tr><tr><td>78</td><td>n</td></tr><tr><td>79</td><td>o</td></tr><tr><td>80</td><td>p</td></tr><tr><td>81</td><td>q</td></tr><tr><td>82</td><td>r</td></tr><tr><td>83</td><td>s</td></tr><tr><td>84</td><td>t</td></tr><tr><td>85</td><td>u</td></tr><tr><td>86</td><td>v</td></tr><tr><td>87</td><td>w</td></tr><tr><td>88</td><td>x</td></tr><tr><td>89</td><td>y</td></tr><tr><td>90</td><td>z</td></tr><tr><td>91</td><td>Windows Key / Left ⌘ / Chromebook Search key</td></tr><tr><td>92</td><td>right window key</td></tr><tr><td>93</td><td>Windows Menu / Right ⌘</td></tr><tr><td>95</td><td>sleep</td></tr><tr><td>96</td><td>numpad 0</td></tr><tr><td>97</td><td>numpad 1</td></tr><tr><td>98</td><td>numpad 2</td></tr><tr><td>99</td><td>numpad 3</td></tr><tr><td>100</td><td>numpad 4</td></tr><tr><td>101</td><td>numpad 5</td></tr><tr><td>102</td><td>numpad 6</td></tr><tr><td>103</td><td>numpad 7</td></tr><tr><td>104</td><td>numpad 8</td></tr><tr><td>105</td><td>numpad 9</td></tr><tr><td>106</td><td>multiply</td></tr><tr><td>107</td><td>add</td></tr><tr><td>108</td><td>numpad period (firefox)</td></tr><tr><td>109</td><td>subtract</td></tr><tr><td>110</td><td>decimal point</td></tr><tr><td>111</td><td>divide</td></tr><tr><td>112</td><td>f1</td></tr><tr><td>113</td><td>f2</td></tr><tr><td>114</td><td>f3</td></tr><tr><td>115</td><td>f4</td></tr><tr><td>116</td><td>f5</td></tr><tr><td>117</td><td>f6</td></tr><tr><td>118</td><td>f7</td></tr><tr><td>119</td><td>f8</td></tr><tr><td>120</td><td>f9</td></tr><tr><td>121</td><td>f10</td></tr><tr><td>122</td><td>f11</td></tr><tr><td>123</td><td>f12</td></tr><tr><td>124</td><td>f13</td></tr><tr><td>125</td><td>f14</td></tr><tr><td>126</td><td>f15</td></tr><tr><td>127</td><td>f16</td></tr><tr><td>128</td><td>f17</td></tr><tr><td>129</td><td>f18</td></tr><tr><td>130</td><td>f19</td></tr><tr><td>131</td><td>f20</td></tr><tr><td>132</td><td>f21</td></tr><tr><td>133</td><td>f22</td></tr><tr><td>134</td><td>f23</td></tr><tr><td>135</td><td>f24</td></tr><tr><td>144</td><td>num lock</td></tr><tr><td>145</td><td>scroll lock</td></tr><tr><td>151</td><td>airplane mode</td></tr><tr><td>160</td><td>^</td></tr><tr><td>161</td><td>!</td></tr><tr><td>162</td><td>؛ (arabic semicolon)</td></tr><tr><td>163</td><td>#</td></tr><tr><td>164</td><td>$</td></tr><tr><td>165</td><td>ù</td></tr><tr><td>166</td><td>page backward</td></tr><tr><td>167</td><td>page forward</td></tr><tr><td>168</td><td>refresh</td></tr><tr><td>169</td><td>closing paren (AZERTY)</td></tr><tr><td>170</td><td>*</td></tr><tr><td>171</td><td>~ + * key</td></tr><tr><td>172</td><td>home key</td></tr><tr><td>173</td><td>minus (firefox), mute/unmute</td></tr><tr><td>174</td><td>decrease volume level</td></tr><tr><td>175</td><td>increase volume level</td></tr><tr><td>176</td><td>next</td></tr><tr><td>177</td><td>previous</td></tr><tr><td>178</td><td>stop</td></tr><tr><td>179</td><td>play/pause</td></tr><tr><td>180</td><td>e-mail</td></tr><tr><td>181</td><td>mute/unmute (firefox)</td></tr><tr><td>182</td><td>decrease volume level (firefox)</td></tr><tr><td>183</td><td>increase volume level (firefox)</td></tr><tr><td>186</td><td>semi-colon / ñ</td></tr><tr><td>187</td><td>equal sign</td></tr><tr><td>188</td><td>comma</td></tr><tr><td>189</td><td>dash</td></tr><tr><td>190</td><td>period</td></tr><tr><td>191</td><td>forward slash / ç</td></tr><tr><td>192</td><td>grave accent / ñ / æ / ö</td></tr><tr><td>193</td><td>?, / or °</td></tr><tr><td>194</td><td>numpad period (chrome)</td></tr><tr><td>219</td><td>open bracket</td></tr><tr><td>220</td><td>back slash</td></tr><tr><td>221</td><td>close bracket / å</td></tr><tr><td>222</td><td>single quote / ø / ä</td></tr><tr><td>223</td><td>`</td></tr><tr><td>224</td><td>left or right ⌘ key (firefox)</td></tr><tr><td>225</td><td>altgr</td></tr><tr><td>226</td><td>&lt; /git &gt;, left back slash</td></tr><tr><td>230</td><td>GNOME Compose Key</td></tr><tr><td>231</td><td>ç</td></tr><tr><td>233</td><td>XF86Forward</td></tr><tr><td>234</td><td>XF86Back</td></tr><tr><td>235</td><td>non-conversion</td></tr><tr><td>240</td><td>alphanumeric</td></tr><tr><td>242</td><td>hiragana/katakana</td></tr><tr><td>243</td><td>half-width/full-width</td></tr><tr><td>244</td><td>kanji</td></tr><tr><td>251</td><td>unlock trackpad (Chrome/Edge)</td></tr><tr><td>255</td><td>toggle touchpad</td></tr></tbody>
    </table>
 

Her er et billede af hvordan jeg forestiller mig at stacken kommer til at fungere.  
![](stack.png)

Ligesom der i p5 er en draw funktion, man kan køre igen og igen tror jeg det også må være essentielt at få lavet et uendeligt loop i BF (altså den må ikke bare timeoute (man kunne sige hvis der var en opcode i et loop, så var der ingen bund) og da det er client-side skal vi ikke være bange for nogle kæmpe hosting regninger)

For at demonstrerer yderligere tænker jeg muligvis at lave en bf version af pong, hvis det kan lade sig gøre