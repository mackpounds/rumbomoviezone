const maximizeError = document.querySelector(".maximize_error_to_fit_screen")  
const refreshPageBtn = maximizeError.querySelector(".popup_error button")  
const unknownErrorP = maximizeError.querySelector(".popup_error p")  

document.addEventListener("DOMContentLoaded", () => {


    // refresh button 
    refreshPageBtn.addEventListener("click", () => {
        location.reload()
    })

    const imagePath = 'https://image.tmdb.org/t/p/w500';
    // let currentIndex = 0
    
     const movieAPI =
      'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=a3060ea251b922c2f7e4008e9c533905&page=3';
    
      
    const videoTemplateCard = document.querySelector("[data-movie-clip]") 
    const currentBackgroundDiv = document.querySelector(".video-background")
    const movieTemplate = document.querySelector("[data-video-template]")
    
    let currentIndex = 0;

    function createMovieDisplays(movies) {
        movies.forEach((movie, index) => {
            const { poster_path, name, overview } = movie;
            const backgroundImageUrl = `url(${imagePath}${poster_path})`;
    
            // Create the movie display element
            const movieDisplay = movieTemplate.content.cloneNode(true).children[0];
            const movieDisc = movieDisplay.querySelector(".video-space span")
            movieDisc.style.backgroundImage = backgroundImageUrl;
            movieDisplay.querySelector("[data-movie-text]").textContent = name;
            movieDisplay.querySelector("[data-desc]").textContent = overview;
    
            // Set the initial position of the movie display off-screen to the right
            movieDisplay.style.transform = `translateX(${index * 100}%)`;
    
            // Append the cloned movie display to the video template card
            videoTemplateCard.appendChild(movieDisplay);
        });
       if (movies.length > 0){
        const initialBackgroundUrl = `${imagePath+movies[currentIndex].poster_path}`
        currentBackgroundDiv.style.backgroundImage = initialBackgroundUrl;
        console.log(currentBackgroundDiv.style.backgroundImage)
       }
    currentBackgroundDiv.style.backgroundImage = movies[currentIndex].initialBackgroundUrl
    }

        // Function to update the visibility of movie displays
        function updateMovieDisplaysVisibility(movies) {
            const movieDisplays = videoTemplateCard.querySelectorAll('.video-wrapper');

            // Hide all movie displays
            movieDisplays.forEach(display => {
                display.classList.remove('visible');
            });

            // Show the current movie display
            movieDisplays[currentIndex].classList.add('visible');

            // Update the current background div to the new current movie's background
            const { poster_path } = movies[currentIndex];
            const newBackgroundImageUrl = `url(${imagePath}${poster_path})`;
            currentBackgroundDiv.style.backgroundImage = newBackgroundImageUrl;

            // Update the current index
            currentIndex = (currentIndex + 1) % movieDisplays.length;
        }



    // Fetch the movie data
    fetch(movieAPI)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const movies = data.results;

        // Create and add movie displays
        createMovieDisplays(movies);

        // // Set up an interval to slide the movie displays every 9 seconds
        setInterval(() => updateMovieDisplaysVisibility(movies), 2000);
    }).catch(error => {
        if(TypeError){
            unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
        }
        unknownErrorP.textContent = "(This error could be due to " + error + ")"
        maximizeError.classList.add("active")
    })
    
   
    
    
    
    
    
    
    // HOME FLEXING
    const firstColumnTemplate = document.querySelector(".first-column-template")
    const firstColumnContainer = document.querySelector("[data-scroll-one]")
    
    fetch("https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=a3060ea251b922c2f7e4008e9c533905&page=7")
    .then(res => res.json())
    .then(data => {
        data.results.forEach(float => {
            const {poster_path, name} = float
            const firstSlideTemplate = firstColumnTemplate.content.cloneNode(true).querySelector(".movie-container")
            const displayimg = firstSlideTemplate.querySelector(".movie-image-bar img")
            const displaytext = firstSlideTemplate.querySelector(".movie-name-bar span")
            displayimg.src = imagePath+poster_path
            displaytext.textContent = name

            // console.log(float, displayimg.src)

            firstColumnContainer.appendChild(firstSlideTemplate)
        })
    }).catch(error =>{
        if(TypeError){
            unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
        }
        unknownErrorP.textContent = "(This error could be due to " + error + ")"
        maximizeError.classList.add("active")
    })
    




    // WRAP SPACES
    const wrapColumntemplate = document.querySelector("[data-wrap-template]")
    const wrapMovies = document.querySelector("[data-wrap-movie]")

    const movieGetApi = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=a3060ea251b922c2f7e4008e9c533905&page="

    getmovieWrap(movieGetApi)

    async function getmovieWrap(url){
        try{
            const res = await fetch(url)
            const data = await res.json()
             
            showWrapMovies(data.results)

        }catch (error){
            if(TypeError){
                unknownErrorP.textContent = "(This error could be due to Failed attempt in connecting to the internet.)"
            }
            unknownErrorP.textContent = "(This error could be due to " + error + ")"
            maximizeError.classList.add("active")
        }
    }


    function showWrapMovies(movies){
        
            const hrElement = document.createElement("div")
            hrElement.classList.add("hrElement")
       
        const newContentSection = document.createElement("div")
        newContentSection.classList.add("wrap-movies")
       

        movies.forEach(movie => {
            const {poster_path, name} = movie
            const wrapContent = wrapColumntemplate.content.cloneNode(true).children[0]
            const wrapwallpaper = wrapContent.querySelector(".movie-image-bar img")
            const wraptext = wrapContent.querySelector(".movie-name-bar span")
            wrapwallpaper.src = imagePath+poster_path
            wraptext.textContent = name
            
            newContentSection.appendChild(wrapContent)
            })
           
            newContentSection.append(hrElement)
            wrapMovies.appendChild(newContentSection)
   
    }
    // PAGINATION
    const paginationEl = document.querySelectorAll(".pagination ul li")

    paginationEl.forEach((pages, index) => {
        pages.addEventListener("click", () => {
            if(getmovieWrap) {
                getmovieWrap(movieGetApi + index)
            }
            pages.classList.add("active")
        })
    })


})

