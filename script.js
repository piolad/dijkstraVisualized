window.onload = () => {
    gridW = document.getElementById('grid');
    init_grid(16)
}

let gridW;

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

//

/**
 * Get the neighbors of a point (up, down, left, right)
 * @param {*} pnt 
 * @returns List of the neighbors of the point - [[x1, y1], [x2, y2], ...]
 */
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

function dijkstraSolve() {
    
    if(pntA == null || pntB == null){
        return null;
    }

    const distances = {}; // distances from the start point
    const previous = {}; // previous element to the key; used to reconstruct the shortest path

    const unvisited = new Set();
    
    // prepare the distances, previous and unvisited sets
    for(i = 0; i < grid_n; i++){
        for (j = 0; j < grid_n; j++){
            
            distances[[i, j]] = Infinity;
            previous[[i, j]] = null;
            unvisited.add([i, j]);
        }
    }
    distances[getXY(pntA)] = 0;

    const pntB_XY = getXY(pntB)

    // main loop
    while (unvisited.size > 0) {
        let currentEl = null;
        let minDist = Infinity;
        
        // find the unvisited element, closest to the start point
        for (const el of unvisited) {
            if(distances[el] < minDist){
                currentEl = el;
                minDist = distances[el];
            }
        }


        // if the closest element is the end point, we found the path
        if(currentEl[0] ==  pntB_XY[0] && currentEl[1] ==  pntB_XY[1]){

            const path = [];
            currentEl = previous[currentEl]
            while(previous[currentEl]){
                path.push(currentEl)
                currentEl = previous[currentEl];
            }
            path.reverse();


            // mark the path on the grid
            path.forEach(element => {
                grid[element[0]][element[1]].classList.add("path");
            });

            return path
        }

        unvisited.delete(currentEl);

        // update distances to the neighbors of the current element
        if (currentEl !== null && distances[currentEl] !== Infinity) {       
            const surround = getSurroundingsXYs(currentEl);

            for(const neighbor of surround){
                const dst = distances[currentEl] + 1;

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
    //no path found :(
    return [];
}

function gridClick(event){

    trg = event.target;
    console.log(trg);

    clPath();

    // if target is start/end point, remove it
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

        // if no start/end point is set, set it
        if(pntA != null){
            if(pntB==null){
                trg.classList.add("pntB")
                pntB = trg;
            }
        }else if(pntA == null){
            trg.classList.add("pntA");
            pntA = trg;
        }

        // toggle barrier otherwise
        if(trg.classList.contains("barr")){
            trg.classList.remove("barr");
        } else if(!(trg.classList.contains("pntB") || trg.classList.contains("pntA"))){
            trg.classList.add("barr")
        }
    }   
}



/**
 * Find the coordinates of a grid element
 * @param {*} el 
 * @returns [x, y] - the coordinates of the element in the grid
 */
function getXY(el) {
    for (let i = 0; i < grid_n; i++) {
        for (let j = 0; j < grid_n; j++) {
            if (grid[i][j] === el) {
                return [i,j]
            }
        }
    }
    return [null, null]
}

/**
 *    Initialize the empty grid with n*n elements
 *
 *    @param {number} n - the number of elements in the grid
 *    
*/
function init_grid(n){
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

function clGridBtn() {
    init_grid(grid_n);
}


function setPntA() {
    //todo: do the function
}

function setPntB() {
    
}

function example1() {

    
    
}
function example2() {

}

function example3() {

}

/**
 * Remove all the path elements, without removing the barriers and the points
 */
function clPath(){
    grid.forEach(row => {
        row.forEach(el => {
            if (el.classList.contains("path")) {
                el.classList.remove("path");
            }
        });
    });
}