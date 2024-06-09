
//  WINDOW ONLOAD   
const windowLoader = document.querySelector(".loader_container")

window.addEventListener("load", function(){
    if (windowLoader){
        windowLoader.classList.add("active")
    }else{
        console.error("Element with className loader_container not found!")
    }
})



// SEARCH LOADER
const searchLoader = document.querySelector("[data-search-loader]")
const randonQuery = document.querySelector(".random_names_before_search")
function showSearchLoader(){
    searchLoader.style.display = "block";
    randonQuery.style.display = "none";
}

function hideSearchLoader(){
    searchLoader.style.display = "none";
    randonQuery.style.display = "block";
}


// SEARCHiMAGELOADER
const imgLoader = document.querySelector("[data-search-img-loader]")
const wrapMovies = document.querySelector(".wrap-movies-search")
function showImgLoader(){
    imgLoader.style.display = "block";
    wrapMovies.style.display = "none";
}

function hideImgLoader(){
    imgLoader.style.display = "none";
    wrapMovies.style.display = "grid";
}