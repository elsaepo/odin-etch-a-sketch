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
            let pixelBorder = document.createElement("div");
            pixelBorder.classList.add("grid-item-border");
            let pixelDiv = document.createElement("div");
            pixelDiv.classList.add("grid-item");
            addMouseListener(pixelDiv)
            pixelDiv.appendChild(pixelBorder)
            row.appendChild(pixelDiv);
        };
        gridContainer.appendChild(row);
    };
}

drawGrid(gridSize);


// mousedown, mouseup, mouseover functions determing when to draw

let mouseButtonIsHolding = false;

document.addEventListener("mouseup", function (e) {
    mouseButtonIsHolding = false;
})

function addMouseListener(div) {
    div.addEventListener("mousedown", function (event) {
        // This simply disables dragging, which conflicts with the mouseup listener
        event.preventDefault();
        if (event.button === 0) {
            draw(event.target);
            mouseButtonIsHolding = true;
        }
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
            pixel.style.opacity = "1";
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


// Settings holders & listeners

let gridSettingsToggle = document.querySelector("#grid-settings");
let gridSettingsContainer = document.querySelector(".grid-popup");
let gridSettingsSwatches = document.querySelectorAll(".grid-swatch");

let colorSettingsToggle = document.querySelector("#color-settings");
let colorSettingsContainer = document.querySelector(".color-popup");
let colorSettingsSwatches = document.querySelectorAll(".color-swatch");
let colorSettingsToggleIcon = document.querySelector(".color-fill i");

let penSettingsSwatches = document.querySelectorAll(".pen-style");

let clearSettingSwatch = document.querySelector("#clear");

gridSettingsToggle.addEventListener("mousedown", function(event){
    colorSettingsToggle.classList.remove("settings-active");
    colorSettingsContainer.classList.add("hidden");
    event.target.classList.toggle("settings-active");
    gridSettingsContainer.classList.toggle("hidden");
})
gridSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function(event){
    gridSettingsSwatches.forEach(grid => grid.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    gridSize = event.target.getAttribute("id").slice(5);
    drawGrid(gridSize);
}));

colorSettingsToggle.addEventListener("mousedown", function(event){
    gridSettingsToggle.classList.remove("settings-active");
    gridSettingsContainer.classList.add("hidden");
    event.target.classList.toggle("settings-active");
    colorSettingsContainer.classList.toggle("hidden");
})

colorSettingsSwatches.forEach(function(swatch){ 
    let swatchColor = `${swatch.getAttribute("id").slice(6)}`;
    swatch.style.backgroundColor = swatchColor;
    swatch.addEventListener("mousedown", function(event){
        colorSettingsSwatches.forEach(color => color.classList.remove("settings-active"));
        event.target.classList.add("settings-active");
        drawColor = swatchColor;
        colorSettingsToggle.style.backgroundColor = swatchColor;
        switch (swatchColor){
            case "black":
            case "#545454":
                colorSettingsToggleIcon.style.color = "white";
                break;
            default:
                colorSettingsToggleIcon.style.color = "black";
        }
    })
})

penSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function(event){
    penSettingsSwatches.forEach(pen => pen.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    drawStyle = event.target.getAttribute("id");
}))

clearSettingSwatch.addEventListener("mousedown", function(){
    drawGrid(gridSize);
});