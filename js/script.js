const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const borrar = document.getElementById('Borrar')

function fetchChiste () {
    fetch ('https://api.chucknorris.io/jokes/random')
    .then(response => {
        if (!response.ok) { 
            throw new Error("Error al obtener el chiste");
        }
        return response.json(); 
    })
    .then(data => {
        const chiste = data.value;
        chistePagina (chiste);
        chisteStorage (chiste);   
    })
    .catch(error => console.error("Error:", error));
}

function chistePagina (chiste) {
    jokeList.innerHTML += `
        <li>
            ${chiste}
        </li>`
    }

function chisteStorage (chiste) {
    const chistes = JSON.parse (localStorage.getItem('chistesChuck')) || [];
    chistes.push(chiste);
    localStorage.setItem('chistesChuck', JSON.stringify(chistes));
}

function cargarChisteStorage () {
    const chistesGuardados = JSON.parse (localStorage.getItem('chistesChuck')) || [];
    chistesGuardados.forEach(element => {
       chistePagina (element)        
    });
}

function borrarChistes () {
    localStorage.clear();
    jokeList.innerHTML = '';
    }

fetchJoke.addEventListener ('click', fetchChiste)
borrar.addEventListener ('click', borrarChistes)

cargarChisteStorage ()

console.log(localStorage.getItem('chistesChuck'))