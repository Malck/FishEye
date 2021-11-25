// parametre a envoyer dans la factory 

// imagin et photographerName

function imageFactory(imagin,photographerName) {

    return `
    <section class="photographer_images" tabindex="0"> 
  
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
}
function videoFactory(imagin,photographerName) {
  return `
  <section class="photographer_images" tabindex="0"> 

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
  
function mediaFactory(imagin,photographerName) {

    if (imagin.image != undefined) {

      return imageFactory(imagin,photographerName);

    }else if (imagin.video != undefined) {

      return videoFactory(imagin,photographerName);    

    } else {
        return "";
    }
  
} 


// mettre le fichier factory.js en premier dans le head 
//dans photographers JS ligne 93 remplacer par 
//let templatePhotographerImages = mediaFactory(imagin);