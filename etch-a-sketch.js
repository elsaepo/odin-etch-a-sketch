const gridContainer = document.querySelector("#grid-container");
let gridSize = 16;
let drawStyle = "pen";
let drawColor = "black";

// Drawing the grid

function drawGrid(gridPixel) {
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild)
    }
    for (let i = 0; i < gridPixel; i++) {
        let row = document.createElement("div");
        row.classList.add("grid-row");
        for (let j = 0; j < gridPixel; j++) {
            let col = document.createElement("div");
            col.classList.add("grid-item");
            addMouseListener(col)
            row.appendChild(col);
        };
        gridContainer.appendChild(row);
    };
}

drawGrid(gridSize);


// mousedown, mouseup, mouseover functions determing when to draw

let mouseButtonIsHolding = false;

document.addEventListener("mouseup", function (e) {
    mouseButtonIsHolding = false;
    console.log(mouseButtonIsHolding)
})

function addMouseListener(div) {
    div.addEventListener("mousedown", function (event) {
        // This simply disables dragging, which conflicts with the mouseup listener
        event.preventDefault();
        if (event.button === 0) {
            draw(event.target);
            mouseButtonIsHolding = true;
        }
        console.log(mouseButtonIsHolding)
    });
    div.addEventListener("mouseover", function (event) {
        if (mouseButtonIsHolding) {
            draw(event.target);
        }
    })

}


// Draw function & cases for different styles

function draw(pixel) {
    switch (drawStyle){
        case "pen":
            pixel.style.backgroundColor = drawColor;
            break;
        case "brush":
            pixel.style.backgroundColor = "grey";
            break;
        case "eraser":
            pixel.style.backgroundColor = "";
            break;
        default:
            alert("How did you get here?");
    }
}


// Settings holders

let gridSettingsToggle = document.querySelector("#grid-settings");
let gridSettingsContainer = document.querySelector(".grid-popup");
let gridSettingsSwatches = document.querySelectorAll(".grid-swatch");

let colorSettingsToggle = document.querySelector("#color-settings");
let colorSettingsContainer = document.querySelector(".color-popup");
let colorSettingsSwatches = document.querySelectorAll(".color-swatch");

let penSettingsSwatches = document.querySelectorAll(".pen-style");

gridSettingsToggle.addEventListener("mousedown", function(event){
    event.target.classList.toggle("settings-active");
    colorSettingsContainer.classList.add("hidden");
    gridSettingsContainer.classList.toggle("hidden");
})
gridSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function(event){
    gridSettingsSwatches.forEach(grid => grid.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    gridSize = event.target.getAttribute("id").slice(4);
    drawGrid(gridSize);
}));



penSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function(event){
    penSettingsSwatches.forEach(pen => pen.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    drawStyle = event.target.getAttribute("id");
}))