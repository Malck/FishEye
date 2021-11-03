async function GetDataFishEye() {
  const url = 'photographers.json';
  const response = await fetch(url) ; 
  const data = await response.json();
   console.log("precharge");
  displayPhotographersPage(data)
  testImage(data);
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
    <p class="photographer_tags">${photographers[0].tags.map(tag => 
      `<a class="tags" href="index.html">#${tag}</a>`).join(" ")}</p>
    </div> 

    <div class="photographer_image">
    <a href="#"> <img src="img/${photographers[0].portrait}"></a>
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
  ${photographers[0].name}
  `
  sectionPhotographerName.innerHTML = templatePhotographerName;
  
// Afficher le prix du photographe dans la box compteur orange 
  
  let sectionPhotographerPrice= document.getElementById("box_price");
  
  let templatePhotographerPrice = ` ${photographers[0].price}€ / jour`
  
  sectionPhotographerPrice.innerHTML = templatePhotographerPrice;


}

  

// Test d'une fonction avec map pour afficher les images du photographe 
function testImage(data) {
  let photographersMedia = data.media;
  console.log(photographersMedia);

  let id = window.location.search.split('id=')[1];
  let medias = !id ? photographersMedia : photographersMedia.filter(media => media.photographerId == id);
  console.log(medias);

  medias.map(imagin => {

  let sectionPhotographerImages = document.getElementById("images");
  let photographerImages = document.createElement('article');

  let templatePhotographerImages = `
  <section class="photographer_images"> 

  <figure>
  <img src="img/Mimi/${imagin.image}">
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

  sectionPhotographerImages.appendChild(photographerImages);
  photographerImages.innerHTML = templatePhotographerImages;
  console.log("displayImage");
  
  })

// Afficher le nombre de likes du photographe dans la box compteur orange 

  let sectionPhotographerLikes= document.getElementById("boxlikes_number");
  
  let templatePhotographerLikes = ` ${medias.likes}`
  
  sectionPhotographerLikes.innerHTML = templatePhotographerLikes;
}





