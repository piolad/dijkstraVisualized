window.onload =()=>{

    init_grid(16)
}


const border_width = "1.75px"
const gridElemWidth = "15px"

let pntA = null
let pntB = null



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
            if(pntB!=null)
                pntB.classList.remove("pntB")
            trg.classList.add("pntB")
            pntB = trg
        }else if(pntA == null){
            trg.classList.add("pntA")
            pntA = trg
        }
    }   
}


function init_grid(n){
    grid = document.getElementById('grid');
    console.log(grid);

    grid.innerHTML = ''
    for (let i = 0; i < n*n; i++) {
        gridElement = document.createElement("div");
        gridElement.addEventListener("click",gridClick, false);

        grid.appendChild(gridElement);
        // grid.innerHTML += "<div><div/>";
        
    }

    // grird.style.grid-template-rows = "repeat(" +n +", " + gridElemWidth+ ");";
}