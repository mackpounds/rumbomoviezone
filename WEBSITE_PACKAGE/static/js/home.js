
document.addEventListener('DOMContentLoaded', (event) => {
    
    const clips = document.querySelectorAll("[data-video-wrapper]")
    const vidSpace = document.querySelectorAll(".video-space span")
    const clipLength = clips.length;
    let currentIndex = 0;


    // DEVICE ORIENTION
    window.addEventListener("deviceorientation", (event) => {
        const gamma = event.gamma;
        const beta = event.beta;
        vidSpace.forEach(vid => {
            vid.style.transform =  `translateY(${gamma}deg) translateX(${beta}deg)`
        })
    })
    
    
    // CARUSEL
    function updateCarusel(){
        const newPosition = -currentIndex * 100 + '%';
        clips.forEach(clip => {
            clip.style.transition = "0.4s all"
            clip.style.transform = `translateX(${newPosition})`;
        })
    }
    


    // SETINTERVAL
    const internalIndex = () => {
        if (currentIndex < clipLength - 1){
            currentIndex ++;
        }
        else{
            currentIndex = 0;
        }
        updateCarusel()

    }

    
    setInterval(internalIndex, 10000)
    
    

    // MOVE MOVIES HORIZONTALLLY
    const mainMovesBar = document.querySelectorAll(".scroll-movies-wrapper")

    mainMovesBar.forEach(moves => {
        moves.addEventListener("click", (e) => {
            const scrollContainer = moves.querySelector(".scroll-movies")
            const containerWidth = scrollContainer.clientWidth;
            if (e.target.matches(".move-right") || e.target.matches(".fa-caret-right")){
                scrollContainer.scrollBy({
                    left: containerWidth,
                    behavior: "smooth"
                });
            }

            if (e.target.matches(".move-left") || e.target.matches(".fa-caret-left")){
                scrollContainer.scrollBy({
                    left: -containerWidth,
                    behavior: "smooth"
                });
            }
        })
    })
})
