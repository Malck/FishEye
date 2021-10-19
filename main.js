async function GetDataFishEye() {
    const url = 'photographers.json';
    const response = await fetch(url) ; 
    const data = await response.json();
    displayPhotographers(data)
    console.log(data);
}

GetDataFishEye()


function displayPhotographers(data) { 
    let photographers = data.photographers;
        photographers.map(photographe => {

            let sectionPhotographers = document.getElementById('photographers');

            let articlePhotographers = document.createElement('article');

            
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

