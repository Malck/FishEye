async function GetDataFishEye() {
  const url = 'photographers.json';
  const response = await fetch(url) ; 
  const data = await response.json();
   console.log("precharge");
  displayPhotographersPage(data)
   console.log("fin")
}

GetDataFishEye()

// Afficher le profil du photographe dont l'id correspond a l'id de la page ou l'on se trouve 
function displayPhotographersPage(data) { 
    
  let photographersData = data.photographers;

  let id = window.location.search.split('id=')[1];
  let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
  
  let sectionPhotographerPage = document.getElementById("photographerPage");
  let photographerPage = document.createElement('article'); // document.createElement('article class="${photographers.name"') pour cibler un article a passer en display none?

  let templatePhotographerPage = `
  <div class="photographer_infos">

    <div class="photographer_text"> 
    <h2>${photographers[0].name}</h2>
    <p class="location">${photographers[0].city}, ${photographers[0].country}</p>
    <p class="tagline">${photographers[0].tagline}</p> 

    </div> 

    <div class="photographer_image">
    <a href="#"> <img src="img/${photographers[0].portrait}"></a>
    </div>
  </div>
  `
  sectionPhotographerPage.appendChild(photographerPage);
  photographerPage.innerHTML = templatePhotographerPage;
  console.log("displaypage");
    
// choix des images a afficher sur la page selon l'id de la page ou l'on se trouve 
  let photographersMedia = data.media;
   console.log(photographersMedia);

  let medias = !id ? photographersMedia : photographersMedia.filter(media => media.photographerId == id);
   console.log(medias);

  let sectionPhotographerImages = document.getElementById("images");
  let photographerImages = document.createElement('article');

  let templatePhotographerImages = `
  <section class="photographer_images"> 

  <figure>
   <img src="img/Mimi/${medias[0].image}">
   <figcaption>Text test</figcaption>
  </figure>
  </section>
  `
  sectionPhotographerImages.appendChild(photographerImages);
  photographerImages.innerHTML = templatePhotographerImages;
  console.log("displayImage");
}






