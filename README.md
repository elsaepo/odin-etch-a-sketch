# pencil.

A simple pixel drawing web app, created with HTML, CSS & vanilla JavaScript.

Part of The Odin Project's [curriculum](https://www.theodinproject.com/lessons/foundations-etch-a-sketch).

Carl Madsen 2022

**[Live page!](https://elsaepo.github.io/pencil/)**

## Functionality

* **Grid size** - select between 8x8, 16x16, 32x32, 64x64 canvas size
* **Draw color** - can pick between a number of pre-determined colour swatches
* **Pen mode** - draws solid colour to the canvas
* **Brush mode** - draws colour to the canvasincrementing opacity by 10%  on each mouseover
* **Eraser** - removes colour from the canvas
* **Clear** - completely erases the canvas

## Contributions

* [Google Fonts](https://fonts.google.com/)
* Icons by [Font Awesome](https://fontawesome.com/)
* [This post](https://stackoverflow.com/a/60468658) by user [HartleySan](https://stackoverflow.com/users/1992973/hartleysan) was instrumental in helping me implement mobile functionality to the app. Specifically, introducing me to .elementFromPoint() that coordinates with the touchmove event.

## Learning outcomes & challenges

* Dynamically populating an HTML container based on user input with JavaScript's **.createElement()**, and assigning functionality to the created elements.
* Undertanding **default mousedown functionality** & how it effects the functionality of the app - and how to disable it.
* Coordinating CSS variables with JavaScript to implement **opacity increments** on mouseover events.
* Creation of **settings tabs** for the user, and how they interact with each other.
* Adding **mobile functionality** and understanding touchstart, touchend and touchmove events.

## Future development

* Allowing the user to save & export their images
* Adding more colour swatches, including a dynamic colour-picker