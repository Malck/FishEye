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

document.addEventListener("keyup", (key) => {
  if(key.code == "Escape"){
   // modalbg.style.display = "none";
   closeModalBtn.click();
  }
})

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
const asking = document.getElementById("asking");
const formConfirm = document.querySelector(".formconfirm");

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


// Fonction principale du formulaire, empecher l'envois par default et valider les champs

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkInputs();
    
    if(isFormValid){
      form.remove();
      formConfirm.classList.remove("hidden");
    }
  console.log("Récupération des données du formulaire");  
  console.log("Prenom: "+first.value, "Nom: "+last.value, "Email: "+email.value);
  console.log("Message: "+asking.value);
});

function checkInputs() {
    const firstValue = first.value.trim();
    const lastValue = last.value.trim();
    const emailValue = email.value.trim(); 
    const askingValue = asking.value.trim();

    let fields = {
      firstName: false,
      lastName: false,
      email: false,
      asking: false,
    };
    
    if(firstValue === '' || first.value.length < 2) {             // Prenom checking  
      setErrorFor(first, 'Le prénom doit etre renseigné');
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

    if(askingValue === ""){
      setErrorFor(asking, "Ecrivez un message")
    } else {
      setSuccessFor(asking);
      fields.asking = true;
    }
    
let fieldsValues = Object.values(fields);
  
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



