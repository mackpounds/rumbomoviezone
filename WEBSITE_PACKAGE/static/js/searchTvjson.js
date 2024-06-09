
document.addEventListener("DOMContentLoaded", () => {

    const imagePath = 'https://image.tmdb.org/t/p/w500';
    const movieGetApi = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=a3060ea251b922c2f7e4008e9c533905&page="


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
        searchQueryTv.focus()
        const movieGetRandomApi = movieGetApi + randomAPIPageNames
        console.log(movieGetRandomApi)
        fetch(movieGetRandomApi)
        .then(res => res.json())
        .then(data => {
            randonNameAppendContainer.innerHTML =""
              data.results.forEach((movie, index) =>{
                const {name, id} = movie
                const movieUrl = `${movieGetRandomApi}/${id}`
                const moviedisplay = document.createElement("div")
                moviedisplay.classList.add("content-search")
                moviedisplay.innerHTML = `
                <div class="meta_names_search" target="_blank" title="${name}">${name}</div>
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

    const searchTvUrl = 'https://api.themoviedb.org/3/search/tv?api_key=a3060ea251b922c2f7e4008e9c533905&query="';
 

        // FOR TVS
        async function getMoviesSearchTv(searchTvUrl){
            try{
                const resp = await fetch(searchTvUrl)
                const data = await resp.json()
                showMoviesSearchesTv(data.results)
                hideImgLoader() //hide loader
            }catch (error){
                if(TypeError){
                    unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
                }
                unknownErrorP.textContent = "(This error could be due to " + error + ")"
                maximizeError.classList.add("active")
                console.error(error)
                hideImgLoader() //hide loader
            }
        }



        // FUNCTION TVS
        const searchHomeWrapperTv = document.querySelector("[data-wrap-search-tv]")
        const searchHomeTemplateTv = document.querySelector("[data-search-template-tv]")

        function showMoviesSearchesTv(movies){
            if(!movies || movies.length === 0){
                searchHomeWrapperTv.innerHTML = `<span>Check the spelling, or try a new search.</span>`
                headerForSearch.innerText = `No Results for "${searchQueryTv.value}"`;
                
            }else{
                searchHomeWrapperTv.innerHTML = ""
                movies.forEach((movie, index) => {
                    const { name, poster_path } = movie
                    const serchtemplate = searchHomeTemplateTv.content.cloneNode(true).children[0]
                    const movieImage = serchtemplate.querySelector(".movie-image-bar img")
                    const movieName = serchtemplate.querySelector(".movie-name-bar span")
                    movieImage.src = imagePath+poster_path;
                    movieName.textContent = name;
                    
                    searchHomeWrapperTv.appendChild(serchtemplate)
    
                    
                })
            }
        }






        // FOR TVS
        async function getSearchFilterTextTv(query){
            try {
                const response = await fetch(searchTvUrl + query)
                const data = await response.json()
                filterAndDisplayMoiesTv(data.results, query)
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

   

        // FOR TVS
    const headerForSearch = document.getElementById("header_for_search")

        function filterAndDisplayMoiesTv(movies, searchQueryValueTv){
            showSearchLoader()
            randonNameAppendContainer.innerHTML = "";
            const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchQueryValueTv.toLowerCase()));
            filteredMovies.forEach((movie, index) => {
                const movieDisplay = document.createElement("div")
                movieDisplay.classList.add("content-search")
                movieDisplay.innerHTML =   `
                <div class="meta_names_search" target="_blank" title="${movie.name}">${movie.name}</div>`;

                randonNameAppendContainer.append(movieDisplay)
                // console.log(movieDisplay)
                console.log(movieDisplay)
                setTimeout(() => {
                    movieDisplay.querySelector(".meta_names_search").classList.add("visible")
                }, index * 100)
            })
            if (filteredMovies.length === 0){
                randonNameAppendContainer.innerHTML = `<h3>"${searchQueryValueTv}" is not found.</h3>`
            }
        }



    const searchQueryTv = document.querySelector(".search_query_display_layout_tv form input")
    hideImgLoader() //hide the loader 
    searchQueryTv.addEventListener("input", (e) => {
        const searchQueryValueTv = e.target.value
        console.log(searchQueryTv)
        showImgLoader() //show loader when on input
        if (searchQueryValueTv && searchQueryValueTv != ""){
             getMoviesSearchTv(searchTvUrl + searchQueryValueTv)
             getSearchFilterTextTv(searchQueryValueTv)
             headerForSearch.innerText = `Results for "${searchQueryValueTv}"`
        }else{
            searchHomeWrapperTv.innerHTML = ""
            headerForSearch.innerText = ``
            hideImgLoader()
        }
      
    })



})
