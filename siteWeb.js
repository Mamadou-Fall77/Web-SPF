window.addEventListener('scroll', function(){
  const header = document.querySelector('header');
  header.classList.toggle("sticky", window.scrollY > 0);
});
function utilisateur() {
  let nom = prompt("Entre votre nom :")
  let age = number(prompt("Entrez votre age :"))

if(age > 20) {
  console.log("Autoriser" + nom)
}else if(age === 20){
  console.log("Vous avez de la chance" + nom)
}else{
  console.log("Désolé, vous n'etes pas autoriser" + nom)
}
utilisateur()
