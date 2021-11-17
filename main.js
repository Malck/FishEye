// FUNCTION PRINCIPALE ET RECUPERATION DES DONNEES DEPUIS LE JSON

async function GetDataFishEye() {
    const url = 'photographers.json';
    const response = await fetch(url) ; 
    const data = await response.json();
    displayPhotographers(data)
    console.log(data);
    filterTag(data.photographers)
}

GetDataFishEye()

/////////////////////////////    UTILISER LA FUNCTION POUR CONSTRUIRE LES PROFILS DES PHOTOGRAPHES   /////////////////////////

function displayPhotographers(data) { 

    let photographers = data.photographers;

    photographers.map(photographe => {

        let sectionPhotographers = document.getElementById('photographers');

        let articlePhotographers = document.createElement('article');

        articlePhotographers.className = photographe.tags.join(' ') + ' articlePh' ;

        articlePhotographers.id = "Ph-"+photographe.id;

        let templatePhotographer = `
            <a href="photographers.html?id=${photographe.id}" title="${photographe.name}">
                <img src="img/${photographe.portrait}">
                <h2 class="name">${photographe.name}</h2>
            </a>
            <p class="location">${photographe.city}, ${photographe.country}</p>
            <p class="tagline">${photographe.tagline}</p>
            <p class="price">${photographe.price}€/jour</p>
            <ul class="filter">${photographe.tags.map(tag =>
                `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
            `
            
        sectionPhotographers.appendChild(articlePhotographers);
        articlePhotographers.innerHTML = templatePhotographer;
    })
}

//////////////////////////////             AJOUTER LA SELECTION PAR TAG             //////////////////

function filterTag(photographers){

    const filtres = document.querySelectorAll(".filters li"); 

    /*const articlePh = document.querySelectorAll("article"); */

    filtres.forEach(function(li) {

        li.addEventListener("click", event => {

            console.log(event.target);

            // ajouter une classe pour styliser le li et le laisser en rouge background quand cliquer 
            // event.target.giveAttribute("redbackground")

            const value = event.target.getAttribute("data-filter");
            console.log(value);

            photographers.forEach(function (photographe) {
                console.log(document.querySelector(`#Ph-${photographe.id}`));

                if(photographe.tags.includes(value) ) {
                     document.querySelector(`#Ph-${photographe.id}`).style.display = "flex";
                } else {
                    document.querySelector(`#Ph-${photographe.id}`).style.display = "none";
                }
                 
            })
     
        });
    });
}

/////////////////////////           SCROLL BUTTON QUI APPARAIT ET DISPARAIT           //////////////////////////////////

function scrollButton() {
    window.addEventListener("scroll", () => {

        let button = document.getElementById("main-link");
        let verticaly = window.scrollY;

        if (verticaly >= 105) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });
}

scrollButton()

