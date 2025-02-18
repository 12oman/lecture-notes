---
title: how to ace this course (interaction design ii)
date: 2024-02-19
subtitle: strategic shortcuts for creative tech
---

# assessment 1: the big one (80%)
*aka: making a website look harder than it is*

* pick your creative library early
* document as you go, not later
* make it look complex while keeping it simple

---

# p5.js is your friend

why p5.js?
* easiest creative coding library to implement
* tons of copy-paste examples
* looks impressive with minimal code

```javascript
// this is literally all you need for a starter
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // your cool effects here
}
```

---

# two interactions that look harder than they are

## mouse trails
```javascript
// looks complex, actually simple
mouseMoved() {
  particles.push({
    x: mouseX,
    y: mouseY
  });
}
```

## scroll animations
```javascript
// intersection observer - sounds fancy, is basic
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});
```

---

# documentation hack

screenshot everything:
* your first attempts
* your bugs
* your fixes

why? turns mistakes into "critical thinking evidence"

---

# assessment 2: the quick win (20%)
*aka: how to write about what you just did*

pick ONE thing that:
* you actually understand
* had visible progress
* ideally broke a few times

---

# the reflection formula

1. what you tried
2. why it failed
3. how you fixed it
4. what you learned

this hits all the marking criteria in one go

---

# pro tips

* start with a template
* commit often (looks productive)
* keep your GitHub clean
* comments are your friend

---

# remember

it's not about perfection - it's about showing your process.

want specific code examples for any of these?