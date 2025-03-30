---
title: touchdesigner 1
date: 2025-03-12
course: interaction design ii
previous: week 3 - computational design
---

this week we're going to get touchdesigner working on your machine. 

---

hopefully you've already downloaded touchdesigner from the [official website](https://derivative.ca/download). and have started to play.

for our setup on campus we need to do a few extra steps.. 

---
as an educational provider we have to make sure that we're using the software in a way that respects the license. this means that we serve the license to you on demand from a locally hosted machine. it's a few steps, but we only need to do this one time per login. 

---

bhanu will join us and help you through the setup. 
first we need to install code meter.
then we need to connect to the localhost. 
then we need to open touchdesigner and get the license. 
if you get asked to login, we need repeat the above because the license may not be served correctly.

---

once you get it running let's create our first network.

---

# first touchdesigner project: interactive webcam effects

---

after students have successfully installed touchdesigner and set up the licensing:

1. **adding an operator**
   * create a new project (file > new)
   * add a video device in top (operator) by right-clicking in the network view and selecting top > video device in
   * this will automatically connect to your webcam
   * you should now see yourself in the 'operator' preview

   ![1](https://d2w9rnfcy7mm78.cloudfront.net/35040418/original_de4cd49933117e51182e5ba12625c9be.png?1741297696?bc=0)


---



2. **an out op**
  drag a new connection out of the 'videodevicein1' operator and press tab.

   ![2](https://d2w9rnfcy7mm78.cloudfront.net/35040416/original_dc781df28f234cbf7534bd9d631c4916.png?1741297696?bc=0)

    then select 'out' and click on the network view to place it. this will create a window that displays the output of the operator.

   ![3](https://d2w9rnfcy7mm78.cloudfront.net/35040417/original_4f45d5d16a0b8f9a7e10f6e91fca423c.png?1741297696?bc=0)

---

why did we do that?

while nothing much has changed visually,
we are creating an output that will be accessible from the 'perform' window later. 

---



2. **adding simple effects**
   * add a level top (top > level) and connect the video device in to it
   * students can adjust brightness/contrast using the parameters in the level top
   * add a blur top (top > blur) after the level top to create a soft focus effect
   * add an edge top (top > edge) in parallel to create an outline effect of their face and movements

---   

3. **combining effects with composite**
   * add a composite top (top > composite) to blend the original webcam feed with the edge detection
   * students can experiment with blend modes and opacity to create interesting overlays
---

4. **making it interactive**
   * add a threshold top (top > threshold) to create a silhouette from their movement
   * connect a feedback top (top > feedback) to create trail effects when they move
---
5. **challenge exercise**
   * have students try to add color manipulation using an hsv adjust top
   * ask them to create a "photo booth" style effect with different visual treatments
---

this project gives students immediate visual feedback as they work with the software, introduces several fundamental operators, and provides a satisfying first experience with touchdesigner's real-time capabilities.

would you like me to expand any part of this or create a more specific visual effect for them to implement?
