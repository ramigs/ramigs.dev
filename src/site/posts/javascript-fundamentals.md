Recently, I decided that I wanted to dive into JavaScript and really learn the programming language
I use the most in my daily basis.
JavaScript is _everywhere_ not only in the browser, but also in the [server]()

I wanted to understand JavaScript at a deeper level.

## History time

its so much better to learn new concepts when you understand the history of  why we got here in the first place
The con of JS as a living language is that you really have to understand it's history in order to fully understand modern methods.

In this fast pace world we live it's important to take some time to understand
and appreciate the events that led us how and why certain things happened the way they did.

Evolution of JavaScript, how it went from a scripting language to a technology that
has so much impact in the lives of any human being that has or had any sort of contact with the web.

Let's go back to the year 1995. 
and the tech industry was starting to catch up academic world to the Internet., which 
bringing it to the mainstream.
This was the era of The first web browsers
At the time Netscape dominated the landscape.
Web designers wanted to add interactivity **dynamic** to the static 

Java was the popularity  programming language of that time, which ended not working as well as expected.

The alternative was Netscape recruiting Brendan Eich, a 34-year-old with knowledge in lexical parsing
and language parsers.
The plan was to port the Scheme (syntax resembles Java) language to the browser.

the first version of the language written by  in [10 days](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/) in 1995

Back to the fundamentals

Inspired by different programming languages
Syntax (Java)
First-class functions (Scheme), dynamic typing (Lisp), prototype-based (Self)

This flexibility and multi-paradigm inspiration makes JavaScript what it is.

After going through several name changes, it finally settled with JavaScript "the cool lightweight cousin"
to the hottest programming language of the day"

"by reading blog posts or copying and pasting code, but they haven’t been able to truly master the"

>"We don’t want to settle for anything less -- this is, after all, our craft." - [You Don't Know JS: Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20&%20going/README.md#you-dont-know-js-up--going)

A reference I can come back to anytime to refresh my understanding.

Atwood's Law:

>“Any application that can be written in JavaScript, will eventually be written in JavaScript.” — Jeff Atwood, Author, Entrepreneur, Co-founder of StackOverflow

"10 years ago:
As a Java developer, I couldn’t tolerate JavaScript. I always believed coding in JavaScript is a mistake. I actually preferred GWT where you write Java code."

https://www.youtube.com/watch?v=FSs_JYwnAdI
https://www.youtube.com/watch?v=9emXNzqCKyg
https://www.youtube.com/watch?v=Sh6lK57Cuk4

## Types and values

Although JavaScript is generally referred to as an interpreted language, it is in fact a compiled language.
Compiled at runtime.
Instead of traditionally-compiled languages which have a clearly separated compilation and runtime.
JavaScript compilation happens just right before it's executed
JavaScript is a dynamically typed programming language.

typeof returns a string with one of these values:

- ```string```
- ```number```
- ```boolean```
- ```null```
- ```undefined```
- ```object```
- ```symbol``` (ES6)

JavaScript has typed values, not typed variables. So the return of typeof is relative to the value that's
stored at the moment in the variable. Contrary to "strongly typed" languages.

typeof null is an interesting case, because it errantly returns "object", when you'd expect it to return "null".

Warning: This is a long-standing bug in JS, but one that is likely never going to be fixed. Too much code on the Web relies on the bug and thus fixing it would cause a lot more bugs!

### Object

The object type refers to a compound value where you can set properties (named locations) that each hold their own values of any type.

Properties can either be accessed with dot notation (i.e., obj.a) or bracket notation (i.e., obj["a"]). Dot notation is shorter and generally easier to read, and is thus preferred when possible.

Bracket notation is useful if you have a property name that has special characters in it, like obj["hello world!"] -- such properties are often referred to as keys when accessed via bracket notation.

bracket notation is also useful if you want to access a property/key but the name is stored in another variable

There are a couple of other value types that you will commonly interact with in JavaScript programs: array and function. But rather than being proper built-in types, these should be thought of more like subtypes -- specialized versions of the object type.

### Functions

### Arrays

## Comparison

### Coercion: Implicit and Explicit

## Truthy & Falsy

https://www.youtube.com/watch?v=tBrv5EjlvMU

## Scope

"well-defined set of rules" for storing variables and later retrieve them.

### Hoisting

## Closures

### Module pattern

## Strict mode

## this & Object prototypes
