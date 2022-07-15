const gridContainer = document.querySelector("#grid-container");
let gridSize = 16;
let drawStyle = "pen";
let drawColor = "000, 000 ,000";

// Drawing the grid
function drawGrid(gridPixel) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }
    for (let i = 0; i < gridPixel; i++) {
        let row = document.createElement("div");
        row.classList.add("grid-row");
        for (let j = 0; j < gridPixel; j++) {
            let pixelDiv = document.createElement("div");
            pixelDiv.classList.add("grid-item");
            // Set initial opacity of the pen - it will change based on drawStyle setting
            pixelDiv.drawOpacity = 0;
            addMouseListener(pixelDiv)
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

// Event Listeners for mobile devices
let touchButtonIsHolding = false;
let currentGridItem = null;

gridContainer.addEventListener("touchstart", function (event) {
    // Prevents dragging the screen around if selecting inside the gridContainer
    event.preventDefault();
    touchButtonIsHolding = true;
    currentGridItem = event.target;
    draw(currentGridItem);
});

gridContainer.addEventListener("touchmove", function (event) {
    if (touchButtonIsHolding) {
        if (event.target.classList.contains("grid-item")) {
            // Get x & y coordinates every time the touch moves
            let clientX = event.touches[0].clientX;
            let clientY = event.touches[0].clientY;
            // .elementFromPoint(x, y) is the secret ingredient here.
            // It returns the top-most object at the specified coordinates
            let hoveredElement = document.elementFromPoint(clientX, clientY);
            if (hoveredElement !== currentGridItem) {
                currentGridItem = hoveredElement;
                // This if() blocks errors from trying to check classList of non-classed elements
                if (currentGridItem.classList && currentGridItem.classList.contains("grid-item")){
                    draw(currentGridItem)
                }
            }
        }
    }
})
document.addEventListener("touchend", function () {
    touchButtonIsHolding = false;
    currentGridItem = false;
})

// Draw function & cases for different styles
function draw(pixel) {
    switch (drawStyle) {
        case "pen":
            pixel.drawOpacity = 1;
            pixel.style.backgroundColor = `rgba(${drawColor}, ${pixel.drawOpacity})`;
            break;
        case "brush":
            pixel.drawOpacity += 0.1;
            pixel.style.backgroundColor = `rgba(${drawColor}, ${pixel.drawOpacity})`;
            break;
        case "eraser":
            pixel.drawOpacity = 0;
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

gridSettingsToggle.addEventListener("mousedown", function (event) {
    colorSettingsToggle.classList.remove("settings-active");
    colorSettingsContainer.classList.add("hidden");
    event.target.classList.toggle("settings-active");
    gridSettingsContainer.classList.toggle("hidden");
})
gridSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function (event) {
    gridSettingsSwatches.forEach(grid => grid.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    gridSize = event.target.getAttribute("id").slice(5);
    drawGrid(gridSize);
}));

colorSettingsToggle.addEventListener("mousedown", function (event) {
    gridSettingsToggle.classList.remove("settings-active");
    gridSettingsContainer.classList.add("hidden");
    event.target.classList.toggle("settings-active");
    colorSettingsContainer.classList.toggle("hidden");
})

// Takes RGB value based on container's ID in index.html - must be RGB as "brush" drawStyle is based on rgba opacity
colorSettingsSwatches.forEach(function (swatch) {
    let swatchId = `${swatch.getAttribute("id")}`;
    let swatchColor = `${swatchId.slice(6, 9)}, ${swatchId.slice(9, 12)}, ${swatchId.slice(12, 15)}`
    swatch.style.backgroundColor = `rgb(${swatchColor})`;
    swatch.addEventListener("mousedown", function (event) {
        colorSettingsSwatches.forEach(color => color.classList.remove("settings-active"));
        event.target.classList.add("settings-active");
        drawColor = swatchColor;
        colorSettingsToggle.style.backgroundColor = `rgb(${swatchColor})`;
        switch (swatchColor) {
            case "000, 000, 000":
            case "084, 084, 084":
                colorSettingsToggleIcon.style.color = "white";
                break;
            default:
                colorSettingsToggleIcon.style.color = "black";
        }
    })
})

penSettingsSwatches.forEach(swatch => swatch.addEventListener("mousedown", function (event) {
    penSettingsSwatches.forEach(pen => pen.classList.remove("settings-active"));
    event.target.classList.add("settings-active");
    drawStyle = event.target.getAttribute("id");
}))

clearSettingSwatch.addEventListener("mousedown", function () {
    drawGrid(gridSize);
});