"use strict";

window.addEventListener("scroll", () => {
    const mainWrapper = document.getElementsByClassName("main-wrapper")[0]
    
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        mainWrapper.classList.add("add_background")
    }else{
        mainWrapper.classList.remove("add_background")
    }
})


// MENUBAR
const menuBar = document.querySelector("[data-far-bars]")
menuBar.addEventListener("click", (e) => {
    let de = e.target
    const navBar = document.querySelector("[data-nav-bar]")
    navBar.classList.toggle("active")
    // faCaret.classList.toggle("active")
    de.classList.toggle("change_color")
})

// SIDEBAR
const sideMenuBar = document.querySelector(".side-menu-bar")
const sideMenu = document.querySelector("[data-side-bar]")
sideMenuBar.addEventListener("click", (e) => {
    let de = e.target
    sideMenu.classList.toggle("active")
    de.classList.toggle("change_color")
    console.log("clicked")
})


// AUTH FUNCTIONALITY
const items = document.querySelectorAll(".credentials")
const linkedSignup = document.querySelectorAll("[data-sign-up]")
const linkedSignIn = document.querySelectorAll("[data-sign-in]")
const formWrapper = document.querySelector("[data-form]")


linkedSignup.forEach(sigup =>  {
    sigup.addEventListener("click" , () => {
       window.location.href='/signup#form-container';
        formWrapper.style.height = "530px";
    })
})

linkedSignIn.forEach(sigin =>  {
    sigin.addEventListener("click" , () => {
      window.location.href='/login#form-container';
        formWrapper.style.height = "400px";
    })
} )


