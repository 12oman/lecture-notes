---
title: digital art pioneers & practices
date: 2024-02-26
subtitle: exploring the landscape of creative code
previous: [week 1 - how to ace this course](/lectures/ID/week1)
---

# pioneering code artists
*setting the foundations*

* Casey REAS - [Process Compendium](https://reas.com/compendium_text/)
  * co-creator of Processing
  * focus on emergent systems
  * abstract computational structures

* Jodi (Joan Heemskerk & Dirk Paesmans)
  * web art pioneers
  * [wwwwwwwww.jodi.org](http://wwwwwwwww.jodi.org)
  * deconstructing digital interfaces

---

# web-native artists
*rethinking the browser*

* Laurel Schwulst
  * [everything](https://laurelschwulst.com/e/)
  * poetic web interactions
  * experimental interfaces

* Mindy Seu
  * [Cyberfeminism Index](https://cyberfeminismindex.com/)
  * archival as practice
  * democratic design

---

# generative art masters
*code as creative medium*

* Tyler Hobbs
  * created Flow Fields
  * [Fidenza algorithm](https://tylerxhobbs.com/fidenza)
  * mathematical beauty

* Dmitri Cherniak
  * [Ringers series](https://deadringers.dmitricherniak.com/)
  * algorithmic minimalism
  * on-chain art pioneer
![image](https://d2w9rnfcy7mm78.cloudfront.net/34643451/original_348d755b803f91b2daaa906cb04ba22b.png?1739922093?bc=0)

```javascript
// example of a simple flow field
function createFlowField() {
  let points = [];
  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);
    let angle = noise(x * 0.01, y * 0.01) * TWO_PI;
    points.push({x, y, angle});
  }
  return points;
}
```

---

# AI art innovators
*pushing computational boundaries*

* Refik Anadol
  * data sculptures
  * AI-driven installations
  * architectural projections

* Sofia Crespo
  * artificial nature
  * neural networks
  * biological simulations

* IX Shells
  * blockchain + AI hybrid works
  * procedural environments
  * digital ecosystems

---

# code poetry & visual systems
*aesthetic programming*

* Kim Asendorf
  * pixel sorting pioneer
  * glitch aesthetics
  * [ASCIImation](http://kimasendorf.com/)
![kim assendorf](https://d2w9rnfcy7mm78.cloudfront.net/34644191/original_338eaeaa3851d010b7961d78f29b1e14.png?1739924148?bc=0)

* ertdfgcvb
  * ASCII art mastery
  * terminal aesthetics
  * [https://ertdfgcvb.xyz/](https://ertdfgcvb.xyz/)

* 404 zero
  * generative typography
  * text-based art
  * [https://404zero.com/](https://www.404zero.com/)

```javascript
// basic ASCII conversion
function toASCII(brightness) {
  const chars = ' .:-=+*#%@';
  return chars[floor(map(brightness, 0, 255, 0, chars.length-1))];
}
```

---

# procedural pioneers
*systems thinking*

* Jared S Tarbell
  * [Complexification](http://www.complexification.net/)
  * mathematical patterns
  * substrate algorithms

* Sage Jenson
  * reaction-diffusion systems
  * biological simulations
  * emergent behaviors

```javascript
// reaction-diffusion example
function diffuse(a, b, f, k) {
  return a + (f * k * b);
}
```

---

# real-time 3D masters
*pushing technical boundaries*

* John Gerrard
  * real-time 3D environments
  * durational works
  * climate consciousness

* Auriea Harvey
  * digital sculpture
  * mixed reality
  * mythological themes

---

# new media experimentalists
*breaking conventions*

* 0xDEAFBEEF
  * on-chain sound art
  * generative audio
  * blockchain primitives

* p1xelfool
  * creative coding education
  * visual programming
  * community building

* Elsif
  * code poetry
  * minimal aesthetics
  * systematic art

---

# practical exercise

pick one artist and:
1. analyze their source code (if available)
2. recreate a simple version
3. document your process
4. reflect on their influence

remember: [last week's tips](/lectures/ID/week1) on documentation!

---

# resources

* [Art Blocks](https://artblocks.io)
* [Creative Applications](https://www.creativeapplications.net)
* [OpenProcessing](https://openprocessing.org)
* [Generator.x](https://generatorx.no)

next week: building your own generative system