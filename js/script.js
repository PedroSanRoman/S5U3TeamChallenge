const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const ENDPOINT = 'https://api.chucknorris.io/jokes/random';
let numero = 0;

console.log(localStorage)

function cargarChistes () {
    numero++
    const datos = localStorage.getItem(`joke${numero}`);
    jokeList.innerHTML += `<li>${datos}</li>`

}
/*
function cargarChistes (chisteGuardado)  {

    const listaChiste = [];
    listaChiste.push(chisteGuardado)
   
    listaChiste.forEach( (joke) =>
        jokeList.innerHTML += `<li>${joke}</li>`   
    )
    console.log(listaChiste); 

     
}*/
cargarChistes ()

fetchJoke.addEventListener('click', () => {
    return fetch(ENDPOINT)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        numero++
        localStorage.setItem( `joke${numero}`, JSON.stringify(data.value));
        
        const chiste = localStorage.getItem(`joke${numero}`) || '';
        
        const chisteGuardado = JSON.parse(chiste);
        cargarChistes (chisteGuardado)
        console.log('chisteGuardado:',chisteGuardado);
        
       jokeList.innerHTML += `<li>${chiste}</li>` 
    })
    .catch((error) => {console.error('Error: ', error.message)});
});