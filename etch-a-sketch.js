let pixelSize = 32;
let gridWidth = 16;
let gridHeight = 16;

let gridContainer = document.querySelector("#grid-container");

for (let i = 0; i < gridHeight; i++) {
    let row = document.createElement("div");
    row.classList.add("grid-row");
    for (let j = 0; j < gridWidth; j++) {
        let col = document.createElement("div");
        col.style.width = `${pixelSize}px`;
        col.style.height = `${pixelSize}px`;
        col.style.border = "1px solid #ddd"
        row.appendChild(col);
    };
    gridContainer.appendChild(row);
};

function randomColor(){
    return `hsl(${Math.floor(Math.random()*360)}, 20%, 50%)`
}