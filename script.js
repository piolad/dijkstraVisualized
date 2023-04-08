window.onload =()=>{

    init_grid(16)
}


const border_width = "1.75px"
const gridElemWidth = "15px"


function init_grid(n){
    grird = document.getElementById('grid');
    console.log(grird);

    grird.innerHTML = ''
    for (let i = 0; i < n*n; i++) {
        grird.innerHTML += "<div><div/>";
        
    }

    // grird.style.grid-template-rows = "repeat(" +n +", " + gridElemWidth+ ");";



}