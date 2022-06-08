async function GetDataFishEye() {
  const url = "photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  displayPhotographersPage(data);

  let photographersMedia = data.media;
  let photographer = getPhotographer(data);

  let photographerName = photographer.name.split(" ")[0];

  console.log(photographersMedia);

  //On recupere l'id de la page sur laquelle on se trouve et qui correspond a l'id d'un photographe pour ensuite n'afficher que ses données 
  let id = window.location.search.split("id=")[1];
  let medias = !id
    ? photographersMedia
    : photographersMedia.filter((media) => media.photographerId == id);
  console.log(medias);

  displayMedia(medias, photographerName);

  // Menu dropdown
  dropDown(medias,photographerName);
}

GetDataFishEye();

// Afficher le profil du photographe dont l'id correspond a l'id de la page ou l'on se trouve
function displayPhotographersPage(data) {
  let photographer = getPhotographer(data);

  let sectionPhotographerPage = document.getElementById("photographerPage");
  let photographerPage = document.createElement("article"); // document.createElement('article class="${photographers.name"') pour cibler un article a passer en display none?

  let templatePhotographerPage = `
  <div class="photographer_infos">

    <div class="photographer_text"> 
    <h2>${photographer.name}</h2>
    <p class="location">${photographer.city}, ${photographer.country}</p>
    <p class="tagline">${photographer.tagline}</p> 
    <p class="photographer_tags">${photographer.tags
      .map((tag) => `<a class="tags" href="index.html">#${tag}</a>`)
      .join(" ")}</p>
    </div> 

    <div class="photographer_image">
    <a href="#"> <img src="img/${photographer.portrait}"></a>
    </div>
  </div>
  `;
  sectionPhotographerPage.appendChild(photographerPage);
  photographerPage.innerHTML = templatePhotographerPage;
  console.log("displaypage");

  // Afficher le nom du photographe dans le formulaire

  let sectionPhotographerName = document.getElementById("photo_contact");
  let templatePhotographerName = `
  Contactez-moi
  ${photographer.name}
  `;
  sectionPhotographerName.innerHTML = templatePhotographerName;

  // Afficher le prix du photographe dans la box compteur orange

  let sectionPhotographerPrice = document.getElementById("box_price");

  let templatePhotographerPrice = ` ${photographer.price}€ / jour`;

  sectionPhotographerPrice.innerHTML = templatePhotographerPrice;
}

// nouvelle fonction get photographe
function getPhotographer(data) {
  let photographersData = data.photographers;
  let id = window.location.search.split("id=")[1];
  let photographers = !id
    ? photographersData
    : photographersData.filter((photographer) => photographer.id == id);

  return photographers[0];
}

// La fonction avec map pour afficher les images du photographe
function displayMedia(medias, photographerName) {
  
  let like = 0;
  medias.map((imagin) => {
    displaySortMedia(imagin, photographerName);
    
    like += imagin.likes;
    /* like = like + 1 
    like += 1 */
  });

  // La lightbox
 const gallery = document.querySelectorAll("#images .figure");
 const previewBox = document.querySelector(".preview-box");
 const closeIcon = previewBox.querySelector(".icon");
 const previewImg = previewBox.querySelector("img");
 const previewVideo = previewBox.querySelector("video");
 const shadow = document.querySelector(".shadow");

 // Boucle des images dans la lightbox
 for (let k = 0; k < gallery.length; k++ ) {
    let newIndex = k;
    let clickImgIndex;  // va servir a recuperer la bonne photo au click apres avoir fermer la lightbox et non pas la derniere qu'on a fait defiler apres ce click sur cette image 

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
        
        document.addEventListener("keyup", (key) => {
        
          if(newIndex > 0 && key.code == "ArrowLeft" ){
           prevBtn.click();
          
          }else if (newIndex < gallery.length - 1 && key.code == "ArrowRight"){
           nextBtn.click();

          }else if(key.code == "Escape"){
            closeIcon.click();
          }

        })
        
      preview();
      previewBox.querySelector("span.title").innerText = gallery[newIndex].nextElementSibling.querySelector(".figcaption .titre").innerText;
      previewBox.classList.add("show");
      shadow.style.display = "block";

      closeIcon.onclick = () =>{
        newIndex = clickImgIndex;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        previewBox.classList.remove("show");
        shadow.style.display = "none";
      }
      
    } 

  }
  document.addEventListener("keyup", (key) => {

    if(key.code =="Enter" && document.activeElement.querySelector(".figure")){
     document.activeElement.querySelector(".figure").click();
    }

  })
  

  // Afficher le nombre de likes du photographe dans la box compteur orange

  let sectionPhotographerLikes = document.getElementById("boxlikes_number");

  let templatePhotographerLikes = ` ${like}`;

  sectionPhotographerLikes.innerHTML = templatePhotographerLikes;

  globalLikes();

} // fin de la function displayMedia(data)

function globalLikes() {
  const likeHeart = document.querySelectorAll(".image_likes i");

  likeHeart.forEach(function (a) {
    a.addEventListener("click", (event) => {
      console.log(event.target);

      let counterLike = event.target.parentNode.firstElementChild; // égal a images_likes p ( le chiffre de like sur la photo)
      let likeValue = parseInt(counterLike.innerText);
      console.log(likeValue);
      let totalLikes = parseInt(
        document.getElementById("boxlikes_number").innerHTML
      );
      console.log(totalLikes);

      //vérifier si la "balise a" contient la classe "like-yes"
      if (event.target.classList.contains("fas")) {
        console.log("remove favorite");
        //event.target.classList.remove("like-yes");
        event.target.classList.remove("fas");
        counterLike.innerHTML = --likeValue;
        document.getElementById("boxlikes_number").innerHTML = --totalLikes;
      } else {
        console.log("add favorite");
        //event.target.classList.add("like-yes");
        event.target.classList.add("fas");
        counterLike.innerHTML = ++likeValue;
        document.getElementById("boxlikes_number").innerHTML = ++totalLikes;
      }
    });
  });
}

function dropDown(medias,photographerName) {
  let arrowOpen = document.getElementsByClassName("sort-btn");
  let arrowClose = document.getElementsByClassName("arrow-up-close");
  let hiddenSort = document.getElementsByClassName("hidden-sort");

  if (arrowOpen) {
    arrowOpen[0].addEventListener("click", () => {
      hiddenSort[0].style.display = "block";
    });
    sortMedias(medias,photographerName);
  }
  if (arrowClose) {
    arrowClose[0].addEventListener("click", () => {
      hiddenSort[0].style.display = "none";
    });
  }
}

function displaySortMedia(imagin, photographerName) {
  let sectionPhotographerImages = document.getElementById("images");
  let photographerImages = document.createElement("article");

  let templatePhotographerImages = mediaFactory(imagin, photographerName); // egal a let templatePhotographerImages = mediaFactory(imagin);

  sectionPhotographerImages.appendChild(photographerImages);
  photographerImages.innerHTML = templatePhotographerImages;
}

function sortMedias(medias,photographerName) {
  let mediaArraySort = [];

  let btnSort = document.querySelector(".sort-btn");
  let hiddenSort = document.getElementsByClassName("hidden-sort");
  let sortBtn = Array.from(document.getElementsByClassName("sort"));

  sortBtn.forEach((btn, index) =>
    btn.addEventListener("click", () => {
      hiddenSort[0].style.display = "none";
      if (index == 0) {
        btnSort.innerHTML = `Popularité`;

        mediaArraySort = medias.sort((a, b) => {
          // Trier par Popularité , likes
          return b.likes - a.likes;
        });
      } else if (index == 1) {
        btnSort.innerHTML = `Date`;

        mediaArraySort = medias.sort((a, b) => {
          // Trier par date
          return new Date(a.date) - new Date(b.date);
          //return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
      } else if (index == 2) {
        btn.innerHTML = `Titre`;

        mediaArraySort = medias.sort((a, b) => {
          return a.title > b.title ? 1 : -1; // si le titre de a plus grand que b on renvoit 1 sinon -1
        });
      }
      console.log(mediaArraySort);  

      document.getElementById("images").innerHTML = "";
      displayMedia(mediaArraySort, photographerName);

      //document.getElementById("images").innerHTML = new mediaFactory(imagin,photographerName,mediaArraySort);
      //console.log(mediaFactory(imagin,photographerName,mediaArraySort));
    })
  );
}








