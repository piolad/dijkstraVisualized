window.onload =()=>{

    init_grid(16)
}

let grid = [];

let grid_n = 0;

const border_width = "1.75px"
const gridElemWidth = "15px"

let pntA = null
let pntB = null


function solve(){
    if(pntA == null || pntB == null){
        return null;
    }
    
    
}


function gridClick(event){
    trg = event.target;
    console.log(trg);
    if(trg.classList.contains("pntA")){
        pntA.classList.remove("pntA")
        pntA = null
        trg.classList.remove("pntA")
    }
    else if(trg.classList.contains("pntB")){
        pntB.classList.remove("pntB")
        pntB = null
        trg.classList.remove("pntB")
    }
    else{
        if(pntA != null){
            if(pntB==null){
                // pntB.classList.remove("pntB")
                trg.classList.add("pntB")
                pntB = trg

            }
        }else if(pntA == null){
            trg.classList.add("pntA");
            pntA = trg;
        }

        if(trg.classList.contains("barr")){
            trg.classList.remove("barr");
        } else if(!(trg.classList.contains("pntB") || trg.classList.contains("pntA"))){
            trg.classList.add("barr")
        }
        

    }   
}


function init_grid(n){
    gridW = document.getElementById('grid');
    gridW.innerHTML = '';

    console.log(gridW);

    grid_n = n

    grid = new Array(n).fill(0).map(() => new Array(n).fill(0));


    for (let i = 0; i < n*n; i++) {
        gridElement = document.createElement("div");
        gridElement.addEventListener("click",gridClick, false);

        gridW.appendChild(gridElement);

        // console.log(`[${(i-i%n)/n}][${i%n}]`);
        grid[(i-i%n)/n][i%n] = gridElement;
        
        // grid.innerHTML += "<div><div/>";
        
    }
    // console.table(grid)

    // grird.style.grid-template-rows = "repeat(" +n +", " + gridElemWidth+ ");";
}