async function GetDataFishEye() {
  const url = 'photographers.json';
  const response = await fetch(url) ; 
  const data = await response.json();
  displayPhotographersPage(data)
  displayMedia(data);
}

GetDataFishEye()

// Afficher le profil du photographe dont l'id correspond a l'id de la page ou l'on se trouve 

function displayPhotographersPage(data) { 
    
  let photographer = getPhotographer(data);
  
  let sectionPhotographerPage = document.getElementById("photographerPage");
  let photographerPage = document.createElement('article'); // document.createElement('article class="${photographers.name"') pour cibler un article a passer en display none?

  let templatePhotographerPage = `
  <div class="photographer_infos">

    <div class="photographer_text"> 
    <h2>${photographer.name}</h2>
    <p class="location">${photographer.city}, ${photographer.country}</p>
    <p class="tagline">${photographer.tagline}</p> 
    <p class="photographer_tags">${photographer.tags.map(tag => 
      `<a class="tags" href="index.html">#${tag}</a>`).join(" ")}</p>
    </div> 

    <div class="photographer_image">
    <a href="#"> <img src="img/${photographer.portrait}"></a>
    </div>
  </div>
  `
  sectionPhotographerPage.appendChild(photographerPage);
  photographerPage.innerHTML = templatePhotographerPage;
  console.log("displaypage");

// Afficher le nom du photographe dans le formulaire 

  let sectionPhotographerName = document.getElementById("photo_contact");
  let templatePhotographerName = `
  Contactez-moi
  ${photographer.name}
  `
  sectionPhotographerName.innerHTML = templatePhotographerName;
  
// Afficher le prix du photographe dans la box compteur orange 
  
  let sectionPhotographerPrice= document.getElementById("box_price");
  
  let templatePhotographerPrice = ` ${photographer.price}€ / jour`
  
  sectionPhotographerPrice.innerHTML = templatePhotographerPrice;


}
// nouvelle fonction get photographe

function getPhotographer(data) {

  let photographersData = data.photographers;
  let id = window.location.search.split('id=')[1];
  let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);

  return photographers[0];

}
  

// Test d'une fonction avec map pour afficher les images du photographe 
function displayMedia(data) {

  let photographersMedia = data.media;
  let photographer = getPhotographer(data);

  let photographerName = photographer.name.split(" ")[0];

  console.log(photographersMedia);

  let id = window.location.search.split('id=')[1];
  let medias = !id ? photographersMedia : photographersMedia.filter(media => media.photographerId == id);
  console.log(medias);

  let like = 0

  medias.map(imagin => {

  let sectionPhotographerImages = document.getElementById("images");
  let photographerImages = document.createElement('article');
  console.log(imagin.image != undefined);

  let templatePhotographerImages = ""

  if(imagin.image != undefined) {

    templatePhotographerImages = `
    <section class="photographer_images"> 
  
    <figure>
    <img src="img/${photographerName}/${imagin.image}">
    <figcaption>
    ${imagin.title}
    <a class="image_likes">
    ${imagin.likes}
    <i class="fas fa-heart"></i>
    </a>
    </figcaption>
    </figure>
    </section>
  `
  } else {
    templatePhotographerImages = `
    <section class="photographer_images"> 
  
    <figure>
    <video controls="controls" src="img/${photographerName}/${imagin.video}" title="${imagin.title}">
    </video>
    <figcaption>
    ${imagin.title}
    <a class="image_likes">
    ${imagin.likes}
    <i class="fas fa-heart"></i>
    </a>
    </figcaption>
    </figure>
    </section>
  `
  }

  sectionPhotographerImages.appendChild(photographerImages);
  photographerImages.innerHTML = templatePhotographerImages;
  console.log("displayImage");

  like += imagin.likes
  /* like = like + 1 
     like += 1 */
  
  })

// Afficher le nombre de likes du photographe dans la box compteur orange 

  let sectionPhotographerLikes= document.getElementById("boxlikes_number");
  
  let templatePhotographerLikes = ` ${like}`
  
  sectionPhotographerLikes.innerHTML = templatePhotographerLikes;
}

/* griefer un element addevenet listener click sur les a images_likes */




