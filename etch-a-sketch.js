let gridContainer = document.querySelector("#grid-container");

function drawGrid(gridWidth, gridHeight, pixelSize) {
    for (let i = 0; i < gridHeight; i++) {
        let row = document.createElement("div");
        row.classList.add("grid-row");
        for (let j = 0; j < gridWidth; j++) {
            let col = document.createElement("div");
            col.style.width = `${pixelSize}px`;
            col.style.height = `${pixelSize}px`;
            col.style.border = "1px solid rgba(55, 55, 55, 0.5)"
            addMouseListener(col)
            addBlackFill(col)
            row.appendChild(col);
        };
        gridContainer.appendChild(row);
    };
}

let mouseButtonIsHolding = false;

document.addEventListener("mouseup", function(e){
    mouseButtonIsHolding = false;
    console.log(mouseButtonIsHolding)
})

function addMouseListener(div) {
    div.addEventListener("mousedown", function(e){
        e.preventDefault();
        if (e.button === 0){
            draw(this);
            mouseButtonIsHolding = true;
        }
        console.log(mouseButtonIsHolding)
    });
    
}

function addBlackFill(div){
    div.addEventListener("mouseover", function(e){
        if (mouseButtonIsHolding){
            draw(this);
        }})
    }
    

drawGrid(16, 16, 32);


function draw(square){
    square.classList.add("black-fill")
}