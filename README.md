# Sluggify

Takes a string, and turns it into a slug (letters, numbers and dashes only).

This utility doesn't just remove non-matching characters, but tries to find english letter replacements for many accented letters.

Currently only works for node.js, not browsers.

# Usage

Require as a node module. It will return a syncronous function which takes in your input string, and returns the newly made slug.

```js
const sluggify = require('sluggify');
let slug = sluggify('Pokémon Red');
console.log(slug);
```
Outputs:

```
pokemon-red
```
