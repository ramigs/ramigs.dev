---
date: 2019-11-24
title: Finding the array element that appears once
description: JavaScript solution to Finding the element that appears once in an array problem
slug: finding-the-element-that-appears-once
tags:
    - javascript
    - algorithms
---

A few days ago, during a job interview, I was asked to live code three exercises
in JavaScript:

1. Palindrome check
2. Find the element that appears once
3. Fizz Buzz

Exercises 1 and 3 went pretty well. I was able to implement them correctly, even
though, for Exercise 1, my initial answer didn't cover all the edge cases
(forgot about space characters and upper/lower case).

Exercise 2 was a bit trickier for me.

>Given an array of integers, all the elements appear twice, except one element
>that appears only once. Write an algorithm to find that element.

The most obvious, brute force solution, consists of two nested loops, where each
element in the array is compared with all the other elements, in order to find
which element is not repeated. **Time complexity** of this solution is O(n^2).

I wanted to avoid an answer with such time complexity - also didn't want to
write two nested `for` loops. So, my first instinct was to look for a higher
order function, such as, `Array.prototype.find()` or `Array.prototype.filter()`,
to which I could pass a function that counted the number of occurrences of an
element in the array.

Since I was allowed to check the web for syntax and built-in methods, I started
searching for such a method.

I realized there's no built-in method that does this in JavaScript and wasn't
finding a simple and elegant solution.

As I decided to implement a working solution, and worry about optimization
later, the interviewer rightfully commented about the time complexity of the
algorithm I was writing.

In fact, this approach also has time complexity O(n^2).

The interviewer proceeded to suggest creating an object and using the array
elements as its properties, to which the corresponding values would keep a
counter on the number of occurrences. 

I immediately remembered doing something similar before, so I knew
`Array.prototype.reduce()` was the way to go.

As I started to implement, I took a bit too much time to figure up the function
I needed to pass to `reduce()` and I didn't get the chance to
finish.

So, here I am to complete this challenge and improve my understanding on how
`reduce()` operates 😉.

This solution has time complexity O(n) and consists of using a hash map to store
the count of each element. Then, it iterates through the keys and returns the
key which has count `1`.

```js
function findElementOnce(arr) {
  let hash = arr.reduce((acc, value) => {
    acc.hasOwnProperty(value) ? acc[value]++ : acc[value] = 1;
    return acc;
  }, {});

  for (const key in hash) {
    if (hash[key] === 1) {
      return key;
    }
  }
}
```

Important notes about this solution, which became now, clearer to me:

- the use of method `Object.prototype.hasOwnProperty()` to check whether the
  object already has the specified element as property.
- the function that's passed to `reduce()` has to return the accumulator.
- the second parameter of `reduce()`, an empty object `{}`, as
  the initial value that is assigned to the accumulator.

During my research for this article, I've
[discovered](https://algorithms.tutorialhorizon.com/find-the-only-element-in-array-which-appears-only-once/)
that this challenge can also be solved efficiently, with time complexity O(n),
using the operator XOR.

In fact, it can even be considered more efficient, since in terms of **space
complexity** it has O(1), whilst the hashing solution has O(n).

```js
function findElementOnce(arr) {
  if(arr.length == 0) return;
  let xor = arr[0];
  for (let i = 1; i < arr.length ; i++) {
    xor ^= arr[i];
  }
  return xor;
}
```

We know that `A XOR A = 0`. If we XOR all the elements in the array, the
elements which are repeated twice will become `0`, while the element which
is appearing only once will remain.

There's also a more complex version of this problem, where every element appears
three times instead of twice, but I'll leave it for you to dive deeper 🌊.