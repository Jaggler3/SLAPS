# SLAPS
SLAPS is a live-string reading system consisting of an array of dots with on/off values in which the combinations represent characters in the alphabet. These characters are display through the set of dots one after the other at a specified rate to represent words and sentences.

Through memorization of these combinations, one can eventually read a string of text as it is being created (for example as someone speaks).

> This is the **original version** of SLAPS and of it's character system.

This repository includes a demonstrator of this concept using a web page on a local server that you can initialize on your machine.

### Run the demonstrator
```
npm update & npm start
```

# Dots
The combination of dots for each character are written into the `public/chars.sd` file.

### **Dot Numbers**
```
(1) (3) (5) (7)
  (2) (4) (6)
```

### **All Character Combinations**
```
      " "        (space / empty character)
( ) ( ) ( ) ( )
  ( ) ( ) ( )

      "0"
(o) ( ) ( ) ( )
  ( ) ( ) ( )
  
      "1"
(o) ( ) ( ) ( )
  (o) ( ) ( )
  
      "2"
(o) (o) ( ) ( )
  (o) ( ) ( )
  
      "3"
(o) (o) ( ) ( )
  (o) (o) ( )
  
      "4"
(o) (o) (o) ( )
  (o) (o) ( )
  
      "5"
(o) (o) (o) ( )
  (o) (o) (o)
  
      "6"
(o) (o) (o) (o)
  (o) (o) (o)
  
      "7"
( ) (o) (o) (o)
  (o) (o) (o)
  
      "8"
( ) (o) (o) (o)
  ( ) (o) (o)
  
      "9"
( ) ( ) (o) (o)
  ( ) (o) (o)
  
      "A"
( ) ( ) ( ) ( )
  (o) ( ) ( )
  
      "B"
( ) (o) ( ) ( )
  (o) ( ) ( )
  
      "C"
( ) ( ) ( ) ( )
  (o) (o) ( )
  
      "D"
( ) ( ) (o) ( )
  (o) ( ) ( )
  
      "E"
( ) ( ) ( ) ( )
  (o) ( ) (o)
  
      "F"
( ) ( ) ( ) (o)
  (o) ( ) ( )
  
      "G"
( ) (o) ( ) ( )
  ( ) ( ) ( )
  
      "H"
( ) (o) ( ) ( )
  ( ) (o) ( )
  
      "I"
( ) (o) (o) ( )
  ( ) ( ) ( )
  
      "J"
( ) (o) ( ) ( )
  ( ) ( ) (o)
  
      "K"
( ) (o) ( ) (o)
  ( ) ( ) ( )
  
      "L"
( ) ( ) ( ) ( )
  ( ) (o) ( )
  
      "M"
( ) ( ) (o) ( )
  ( ) (o) ( )
  
      "N"
( ) ( ) ( ) ( )
  ( ) (o) (o)
  
      "O"
( ) ( ) ( ) (o)
  ( ) (o) ( )
  
      "P"
( ) ( ) (o) ( )
  ( ) ( ) ( )
  
      "Q"
( ) ( ) (o) ( )
  ( ) ( ) (o)
  
      "R"
( ) ( ) (o) (o)
  ( ) ( ) ( )
  
      "S"
( ) ( ) ( ) ( )
  ( ) ( ) (o)
  
      "T"
( ) ( ) ( ) (o)
  ( ) ( ) (o)
  
      "U"
( ) (o) ( ) ( )
  (o) (o) ( )
  
      "V"
( ) (o) (o) ( )
  (o) ( ) ( )
  
      "W"
( ) (o) ( ) ( )
  (o) ( ) (o)
  
      "X"
( ) (o) ( ) (o)
  (o) ( ) ( )
  
      "Y"
( ) (o) (o) ( )
  ( ) (o) ( )
  
      "Z"
( ) (o) ( ) ( )
  ( ) (o) (o)
  
      "."        (period)
( ) (o) ( ) (o)
  ( ) (o) ( )
  
      "'"        (apostrophe)
( ) ( ) (o) ( )
  ( ) (o) (o)
```

## MIT LICENSE
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.