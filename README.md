# fill-range-pattern

Creates array sequences based on inputs. The exported function takes three arguments, an initializer (which becomes the starting value or values), an inner function, and a desired array length.

### Quick Example
```js
const filler = require("fill-range-pattern");

filler(1, (x) => x * 2, 5)
//=> [1, 2, 4, 8, 16]
```

The intializer can be a number or an array of desired starting values. (The second case is useful if you wish to establish a sequence that looks back on prior indices, such as the Fibonacci Sequence.)

The inner function will begin to work on the final starting value, and perform its operation on that value before pushing the result on the result array. The inner function will then perform its operation on the new final value (the one that was just added), etc. This process will iterate until the desired length is reached. Length includes any given starting value or values.

The inner function can be specified in a variety of ways. It can have a single parameter, the value to be modified after each step. It can alternatively have two or three parameters. The second parameter is index (CAUTION: when using index i, note the fact i refers to the index of the last value already created in the array, and not the index of the new value that will be created). The third parameter is the array itself.

As another option, the inner function can be written as a string of at least two characters. The first character should be "+", "-", "*", "/", or "^". The remaining characters should be able to be coerced into a number. The inner function will be then understood as creating a series by repeatedly performing the indicated operation with the coerced number on the last value in the array to create the next value in the array. To put more simply, the inner function will understand '+2' as increment each new value by two. To help reduce errors, the inner function understands a prepended "**" as a synonym to "^".

## Install

```
$ npm i fill-range-pattern
```

## Extended Usage Example

```js
const filler = require("fill-range-pattern");

function add2 (x){
    return x + 2
}
const add3 = (x) => x+3

filler(1, (x) => x * 2, 5)
//=> [1, 2, 4, 8, 16]

filler([0,1], (x,i,a)=> a[i-1]+a[i], 10)
//=> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
//The Fibonacci Sequence!

filler(3,"^2", 3)
//=> [3, 9, 81]

filler(2,"**2",3)
//=> [2, 4, 16]

filler(1,"*2",3)
//=> [1, 2, 4]

filler(1,"+20",3)
//=> [1, 21, 41]

filler(1,"-2",3)
//=> [1, -1, -3]

filler(1,"/2",3)
//=> [1, 0.5, 0.25]

filler(1, add2, 3)
//=> [1, 3, 5]

filler(1, add3, 3)
//=> [1, 4, 7]

filler(0, (x,i)=> i, 5)
//=> [0, 0, 1, 2, 3]
//example of index behavior

filler(0, (x,i)=> i+1, 5)
//=> [0, 1, 2, 3, 4]
//further index behavior--by adding 1, we are pointing to the value being created