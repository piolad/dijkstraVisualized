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

function getSurroundingsXYs(pnt) {
    result = [];

    if(pnt[0] + 1 < grid_n)
        result.push([pnt[0] + 1, pnt[1]])
    
    if(pnt[0] > 0)
        result.push([pnt[0] - 1, pnt[1]])
    
    if(pnt[1] + 1 < grid_n)
        result.push([pnt[0], pnt[1] + 1])
    
    if(pnt[1] > 0)
        result.push([pnt[0], pnt[1] - 1])
    
    return result;
}

const distances = {};

function dijkstraSolve() {
    const pntB_XY = getXY(pntB)

    if(pntA == null || pntB == null){
        return null;
    }

    const distances = {};
    const previous = {}
    const unvisited = new Set();
    
    for(i = 0; i < grid_n; i++){
        for (j = 0; j < grid_n; j++){
            
            distances[[i, j]] = Infinity;
            previous[[i, j]] = null;
            unvisited.add([i, j]);
        }
    }

    
    console.log(distances);
    // console.log(getXY(pntA));
    distances[getXY(pntA)] = 0;

    
    // return;
    

    while (unvisited.size > 0) {
        // console.log(1);
        let currentEl = null;
        let minDist = Infinity;
    
        for (const el of unvisited) {
            if(distances[el] < minDist){
                currentEl = el;
                minDist = distances[el];
                // break;
            }
        }
        
        // return;
        // console.log(currentEl)
        
        // console.log("==========")
        // console.log(currentEl)
        // console.log(getXY(pntB))

        
        if(currentEl[0] ==  pntB_XY[0] && currentEl[1] ==  pntB_XY[1]){
            // console.log(distances)
            // console.log(previous)
            // console.log(unvisited)


            const path = [];
            currentEl = previous[currentEl]
            while(previous[currentEl]){
                path.push(currentEl)
                currentEl = previous[currentEl];
            }

            // path.push(getXY(pntA));
            
            path.reverse();

            path.forEach(element => {
                grid[element[0]][element[1]].classList.add("path");
            });

            return path
        }

        // console.log(unvisited.size);
        // console.log(unvisited.has(currentEl))

        unvisited.delete(currentEl);

        // console.log(unvisited.has(currentEl))
        // return;

        if (currentEl !== null && distances[currentEl] !== Infinity) {
            
            
            const surround = getSurroundingsXYs(currentEl);
            

            for(const neighbor of surround){
                const dst = distances[currentEl] + 1;

                // console.log(neighbor);

                if (dst < distances[neighbor]) {
                    if ( grid[neighbor[0]][neighbor[1]].classList.contains("barr") ) {
                        distances[neighbor] = Infinity
                    }
                    else {
                        distances[neighbor] = dst;    
                        previous[neighbor] = currentEl;
                    }
                    
                    
                }
            }

        }

    }

    console.log("...");
    return [];
}


function gridClick(event){

    trg = event.target;
    console.log(trg);

    //clear previous path
    grid.forEach(row => {
        row.forEach(el => {
            if (el.classList.contains("path")) {
                el.classList.remove("path");
            }
        });
    });

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

function getXY(el) {
    //if(el not in grid)
    //do sth
    for (let i = 0; i < grid_n; i++) {
        for (let j = 0; j < grid_n; j++) {
            if (grid[i][j] === el) {
                return [i,j]
            }
        }
    }
    return [null, null]
}

function init_grid(n){
    gridW = document.getElementById('grid');
    gridW.innerHTML = '';

    pntA = null
    pntB = null
    grid_n = n

    grid = new Array(n).fill(0).map(() => new Array(n).fill(0));


    for (let i = 0; i < n*n; i++) {
        gridElement = document.createElement("div");
        gridElement.addEventListener("click",gridClick, false);

        gridW.appendChild(gridElement);
        grid[(i-i%n)/n][i%n] = gridElement;
    }
}