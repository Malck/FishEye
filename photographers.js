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
  
    <div class="figure">
    <img src="img/${photographerName}/${imagin.image}">
    </div>

    <div class="figcaption">

    <div class="titre">${imagin.title}</div>
    <div class="image_likes" data-filter="${imagin.title}" id="image.likes">
    <p>${imagin.likes}</p>
    <i class="far fa-heart .like"></i>
    </div>

    </div>

    </section>
  `
  } else {
    templatePhotographerImages = `
    <section class="photographer_images"> 
  
    <div class="figure">
    <video controls="controls" src="img/${photographerName}/${imagin.video}" title="${imagin.title}">   
    </video>
    </div>

    <div class="figcaption">
    <div class="titre">${imagin.title}</div>
    <div class="image_likes" data-filter="${imagin.title}" >
    <p>${imagin.likes}</p>
    <i class="far fa-heart .like"></i>
    </div>
    </div>

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


// Lightbox 

 const gallery = document.querySelectorAll("#images .figure");
 const previewBox = document.querySelector(".preview-box");
 const closeIcon = previewBox.querySelector(".icon");
 const previewImg = previewBox.querySelector("img");
 const previewVideo = previewBox.querySelector("video");
 const shadow = document.querySelector(".shadow");


 // once window loaded
  for (let k = 0; k < gallery.length; k++ ) {
    let newIndex = k;
    let clickImgIndex;
      gallery[k].onclick = () =>{
        clickImgIndex = newIndex;
        console.log(k);

        function preview(){

         if(gallery[newIndex].querySelector("img")){
          let selectedImgUrl = gallery[newIndex].querySelector("img").src;
          previewImg.src = selectedImgUrl;
          previewVideo.style.display = "none";
          previewImg.style.display = "block"

        }else if(gallery[newIndex].querySelector("video")){
          let selectedImgUrl = gallery[newIndex].querySelector("video").src;
          previewVideo.src = selectedImgUrl;
          previewImg.style.display = "none";
          previewVideo.style.display = "block";
        } 
      }
      //button next and prev 
      const prevBtn = document.querySelector(".prev");
      const nextBtn = document.querySelector(".next");
      if(newIndex == 0){
        prevBtn.style.display = "none";
      }
      if(newIndex >= gallery.length -1){
        nextBtn.style.display ="none";
      }
      prevBtn.onclick = () =>{
        newIndex--;
        if(newIndex == 0){
          preview();
          previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;
          prevBtn.style.display = "none";
        }else{
          preview();
          previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;
          nextBtn.style.display = "block";
        }
      }
      nextBtn.onclick = () =>{
        newIndex++;
        if(newIndex >= gallery.length - 1){
          preview();
          previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;
          nextBtn.style.display = "none";
        }else{
          preview();
          previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;
          prevBtn.style.display = "block";
        }
      }
      
      preview();
      previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;

      previewBox.classList.add("show");
      shadow.style.display = "block";

      //document.querySelector("body").style.overflow = "hidden";
      

      closeIcon.onclick = () =>{
        newIndex = clickImgIndex;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        previewBox.classList.remove("show");
        shadow.style.display = "none";

        //document.querySelector("body").style.overflow = "hidden";

      }

    } 
}

// Afficher le nombre de likes du photographe dans la box compteur orange 

  let sectionPhotographerLikes= document.getElementById("boxlikes_number");
  
  let templatePhotographerLikes = ` ${like}`
  
  sectionPhotographerLikes.innerHTML = templatePhotographerLikes;

// Fonction des ajouts et diminutions des likes 
function globalLikes(){

  const likeHeart = document.querySelectorAll(".image_likes i"); 
  //console.log(likeHeart);

  likeHeart.forEach(function(a) {
   console.log(a);
    
   a.addEventListener("click", event => {

    console.log(event.target);
    
    let counterLike = event.target.parentNode.firstElementChild; // égal a images_likes p ( le chiffre de like sur la photo)
    let likeValue = parseInt(counterLike.innerText);
    console.log(likeValue);
    let totalLikes = parseInt(document.getElementById('boxlikes_number').innerHTML);
    console.log(totalLikes);


    //vérifier si la "balise a" contient la classe "like-yes"
    if(event.target.classList.contains("like-yes")){
      console.log("remove favorite");
      event.target.classList.remove("like-yes");
      event.target.classList.remove("fas");
      counterLike.innerHTML = --likeValue;
      document.getElementById('boxlikes_number').innerHTML = --totalLikes ;

     }else{
      console.log("add favorite");
      event.target.classList.add("like-yes");
      event.target.classList.add("fas");
      counterLike.innerHTML = ++likeValue;
      document.getElementById('boxlikes_number').innerHTML = ++totalLikes ;
     }
 
    });

  });

}
globalLikes();

}









