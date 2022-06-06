## Openclassrooms Project 6 

Create an accessible website for a platform of photographers

## Prepare your setup 
- Download this project in your computer 
- Use VSCode ( or another code editor ) to open it 
- Install the extension ```Live Server```
- Now you can see the website ! Enjoy ! 

## Lazy Way 
- You can check how the site looks like without downloading it too , just check on the github-pages

## Description

- Data :
 
  On récupère les données dans le fichier photographers.json avec la fonction GetDataFishEye 
 
 
- Factory :
 
  - mediaFactory va verifier si le media est une image ou une video 
 
  - imageFactory crée la structure pour une image 
 
  - videoFactory crée la structure pour une video 
  
  
- Page d'accueil : 
 
  - La fonction displayPhotographers va afficher les differents profils des photographes en utilisant une fonction map a l'interieur
 
  - La fonction filterTag va permettre de filtrer les profils de photographes qui seront affichés apres avoir cliqué sur un tag dans la navigation 
 
  - La fonction scrollButton va faire apparaitre le bouton pour retourner en haut de la page 
 
 
 - Pages des Photographes : 
 
  - La fonction displayPhotographersPage crée le profil du photographe sur sa page 
 
  - La fonction displayMedia crée la galerie d'image du photographe en utilisant la factory 
 
  - La fonction sortMedia va faire le tri et ranger les images dans l'ordre choisit sur le menu dropDown par Popularité ( nombre de likes ) Date ou Titre ( par odre alphabétique)
 
  - La fonction globalLikes sert a ajouter un like ou retirer un like selon si l'utilisateur clique sur un coeur vide ou remplit 

 
