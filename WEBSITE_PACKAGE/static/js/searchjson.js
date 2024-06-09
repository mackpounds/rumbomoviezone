
document.addEventListener("DOMContentLoaded", () => {

    const imagePath = 'https://image.tmdb.org/t/p/w500';
    const movieGetApi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a3060ea251b922c2f7e4008e9c533905&page="


    // SEAECGBTN
    const searchIcon = document.querySelector("[data-search-icon]")
    const randomAPIPageNames = Math.floor((Math.random() * 20) + 1)
    // const templateCol = document.querySelector("[data-random-api-name]")
    const randonNameAppendContainer = document.querySelector(".random_names_before_search")
    const maxPopSearch = document.querySelector(".maximize_popup_on_search_click")
    const popSearchDismiss = maxPopSearch.querySelector("[data-popup-search]")
    popSearchDismiss.addEventListener("click", e => {
        if(e.target.matches(".fa-times")){
            maxPopSearch.classList.remove("active")
            window.location.reload()
        }
    })
    searchIcon.addEventListener("click", () => {
        showSearchLoader()
        searchQuery.focus()
        const movieGetRandomApi = movieGetApi + randomAPIPageNames
        console.log(movieGetRandomApi)
        fetch(movieGetRandomApi)
        .then(res => res.json())
        .then(data => {
            randonNameAppendContainer.innerHTML =""
              data.results.forEach((movie, index) =>{
                const {title, id} = movie
                const movieUrl = `${movieGetRandomApi}/${id}`
                const moviedisplay = document.createElement("div")
                moviedisplay.classList.add("content-search")
                moviedisplay.innerHTML = `
                <div class="meta_names_search" target="_blank" title="${title}">${title}</div>
                `
                randonNameAppendContainer.append(moviedisplay)
                setTimeout(() => {
                    moviedisplay.querySelector(".meta_names_search").classList.add("visible")
                }, index * 100)
                
            }) 
        
            hideSearchLoader()
        }).catch(error => {
            const fConnection = document.querySelector(".fail_connection")
            fConnection.textContent = "Failed to get Search Query due to you internet connection. try connecting to the internet!"
            hideSearchLoader()
        })
        maxPopSearch.classList.add("active")
    })

    // SEARCHBARCONTAINER
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=a3060ea251b922c2f7e4008e9c533905&query="';

 


        // SEARCHAPI
        async function getMoviesSearchAll(searchUrl){
            try{
                const resp = await fetch(searchUrl)
                const data = await resp.json()
                showMoviesSearchesAll(data.results)
                hideImgLoader() //hide loader
            }catch (error){
                if(TypeError){
                    unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
                }
                unknownErrorP.textContent = "(This error could be due to " + error + ")"
                maximizeError.classList.add("active")
                hideImgLoader() //hide loader
            }
        }
    



        const searchHomeWrapper = document.querySelector("[data-wrap-search]")
        const searchHomeTemplate = document.querySelector("[data-search-template]")

        function showMoviesSearchesAll(movies){
            if(!movies || movies.length === 0){
                searchHomeWrapper.innerHTML = `<span>Check the spelling, or try a new search.</span>`
                headerForSearch.innerText = `No Results for "${searchQuery.value}"`;
                
            }else{
                searchHomeWrapper.innerHTML = ""
                movies.forEach((movie, index) => {
                    const { title, poster_path } = movie
                    const serchtemplate = searchHomeTemplate.content.cloneNode(true).children[0]
                    const movieImage = serchtemplate.querySelector(".movie-image-bar img")
                    const movieName = serchtemplate.querySelector(".movie-name-bar span")
                    movieImage.src = imagePath+poster_path;
                    movieName.textContent = title;
                    
                    searchHomeWrapper.appendChild(serchtemplate)
    
               
                })
            }
        }







        async function getSearchFilterText(query){
            try {
                const response = await fetch(searchUrl + query)
                const data = await response.json()
                filterAndDisplayMoies(data.results, query)
                hideSearchLoader()//hide loader

            }catch(error){
                if(TypeError){
                    unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
                }
                unknownErrorP.textContent = "(This error could be due to " + error + ")"
                maximizeError.classList.add("active")
                hideSearchLoader() //hide loader

            }
        }

     

        function filterAndDisplayMoies(movies, searchQueryValue){
            showSearchLoader()
            randonNameAppendContainer.innerHTML = "";
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchQueryValue.toLowerCase()));
            filteredMovies.forEach((movie, index) => {
                const movieDisplay = document.createElement("div")
                movieDisplay.classList.add("content-search")
                movieDisplay.innerHTML =   `
                <div class="meta_names_search" target="_blank" title="${movie.title}">${movie.title}</div>`;

                randonNameAppendContainer.append(movieDisplay)
                // console.log(movieDisplay)

                setTimeout(() => {
                    movieDisplay.querySelector(".meta_names_search").classList.add("visible")
                }, index * 100)
            })
            if (filteredMovies.length === 0){
                randonNameAppendContainer.innerHTML = `<h3>"${searchQueryValue}" is not found.</h3>`
            }
        }


        // INPUT
    const headerForSearch = document.getElementById("header_for_search")
    hideImgLoader() //hide the loader 
    const searchQuery = document.querySelector(".search_query_display_layout form input")
    searchQuery.addEventListener("input", (e) => {
        const searchQueryValue = e.target.value
        showImgLoader() //show loader when on input
        if (searchQueryValue && searchQueryValue != ""){
             getMoviesSearchAll(searchUrl + searchQueryValue)
             getSearchFilterText(searchQueryValue)
             headerForSearch.innerText = `Results for "${searchQueryValue}"`
        }else{
            searchHomeWrapper.innerHTML = ""
            headerForSearch.innerText = ``
            hideImgLoader()
        }
      
    })




})
