async function GetDataFishEye() {
    const url = 'photographers.json';
    const response = await fetch(url) ; 
    const data = await response.json();
    console.log("precharge");
    displayPhotographersPage(data)
    console.log(data);
    console.log("fin")
}

GetDataFishEye()


function displayPhotographersPage(data) { 
    
    let photographersData = data.photographers;
    let id = window.location.search.split('id=')[1];
    let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
    

            let sectionPhotographerPage = document.getElementById("photographerPage");

            let photographerPage = document.createElement('article');

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
}



// Formulaire event


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector("#close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event 
closeModalBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form 
function closeModal() {
  modalbg.style.display = "none";
}

const form = document.getElementById("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");

// function pour definir l'erreure et la validation d'un input 

function setErrorFor(input, message) {
    const formControl = input.parentElement; // div .formData
    const small = formControl.querySelector('small');
    // add error message in small 
    small.innerText = message;
    // add error class 
    formControl.className = 'formData error';
}
  
function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "formData success";
}

let isFormValid = false;

function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
// fonction principale du formulaire empecher l'envois par default et valider les champs
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkInputs();
    
    if(isFormValid){
      form.remove();
    }
  
  });

function checkInputs() {
    const firstValue = first.value.trim();
    const lastValue = last.value.trim();
    const emailValue = email.value.trim(); 

    let fields = {
      firstName: false,
      lastName: false,
      email: false,
    };
    
    if(firstValue === '' || first.value.length < 2) {             // Prenom checking  
      setErrorFor(first, 'Le prenom doit etre renseigné');
    } else {
      setSuccessFor(first);
      fields.firstName = true;
    }
  
    if(lastValue === '' || last.value.length < 2 ){                 // Nom de famille checking 
      setErrorFor(last, "Le nom doit faire plus de 2 caractères");
    } else {
      setSuccessFor(last);
      fields.lastName = true;
    }
   
    if(emailValue === ""){                         //Email checking  
      setErrorFor(email, "Email à remplir ");                              
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Email invalid");
    } else { 
      setSuccessFor(email);
      fields.email = true;
    }

let fieldsValues = Object.values(fields);
  console.log('fieldsValues', fieldsValues);

  if (fieldsValues.includes(false) == true) {
    console.log("Le formulaire n'est pas valide.");
    return false;
  }
  if (fieldsValues.includes(false) == false) {
    console.log("Le formulaire est valide.");
    isFormValid = true;
    return true;
  }
} 