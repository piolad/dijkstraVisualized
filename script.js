window.onload =()=>{

    init_grid(16)
}

let grid = [];

let grid_n = 0;

const border_width = "1.75px"
const gridElemWidth = "15px"

let pntA = null
let pntB = null


function getSurroundings(pnt){
    result = []
    
    ns = pnt.nextSibling
    ps = pnt.previousSibling
    if(ns!=null){
        result.push(ns)
        for(i=0; i<grid_n-1; i++){
            if(ns!=null){
                ns = ns.nextSibling
            }
        }
        if(ns!=null){
            result.push(ns)
        }
    }
    if(ps!=null){
        result.push(ps)
        for(i=0; i<grid_n-1; i++){
            if(ps!=null){
                ps = ps.previousSibling
            }
        }
        if(ps!=null){
            result.push(ps)
        }
    }

    return result;
}

const distances = {};

function dijkstraSolve(){

    console.log("b");
    if(pntA == null || pntB == null){
        return null;
    }
    // const distances = {};
    const previous = {}
    const unvisited = new Set();
    
    for(let row of grid){
        for(let el of row){
            distances[el] = Infinity;
            previous[el] = null;
            unvisited.add(el);
        }
    }
    distances[pntA] = 0;

    console.log(distances)

    while(unvisited.size > 0){
        let currentEl = null;
        let minDist = Infinity;
    
        for(const el of unvisited){
            if(distances[el] < minDist){
                currentEl = el;
                minDist = distances[el];
            }
        }

        if(currentEl === pntB){
            // console.log(distances)
            // console.log(previous)
            // console.log(unvisited)


            const path = [];
            while(previous[currentEl]){
                path.push(currentEl)
                currentEl = previous[currentEl];
            }
            path.push(pntA)
            path.reverse()
            console.log(path)
            return path
        }

        unvisited.delete(currentEl);

        if(currentEl !== null && distances[currentEl] !== Infinity){
            const surround = getSurroundings(currentEl);

            for(const neighbor of surround){
                const dst = distances[currentEl] + 1;

                if(dst < distances[neighbor]){
                    distances[neighbor] = dst;
                    previous[neighbor] = currentEl;
                }
            }

        }
    }

    
    return [];
}


function gridClick(event){

    trg = event.target;
    console.log(trg);
    // console.log(getSurroundings(trg));

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
        grid[(i-i%n)/n][i%n] = gridElement;
    
        
    }
}