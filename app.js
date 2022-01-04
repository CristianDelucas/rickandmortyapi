
const $$pagination = document.querySelector('.pagination');
let url = `https://rickandmortyapi.com/api/character`;
window.onload = function() {
    init();
}

const init = async () => {

    const characters = await getCharacters(url);

    document.querySelector('#characters').innerHTML='';
    mappedCharacters(characters);

    const info = await characters.info;
    $$pagination.innerHTML = '';
    pagination(info);


}


const getCharacters = async (url) =>{

    //realizamos petición a la api
    const result = await fetch(url);

    //lo convertimos a json para poder leerlo
    const resultToJson = await result.json();

    //devolvemos el json
    return resultToJson;
}

const mappedCharacters = (characters) => {

    characters.results.map((character) =>{
        return printCharacter({name: character.name , img: character.image});
    } );
}


const printCharacter = (character) => {

    //recogemos el elemento donde guardaremos todos los characters que recogamos
    let characterContainer = document.querySelector('#characters');
    
    characterContainer.innerHTML += `<li>
    <p>${character.name}</p>
    <img src=${character.img} alt=${character.name}/>
    </li>`;
}

const pagination = (info) =>{

    console.log(info);

    $$nextPage = document.createElement('button');
    $$nextPage.innerHTML = '>>'
    $$nextPage.addEventListener('click' , () => {
        url=info.next;
        init();
    })

    $$previousPage = document.createElement('button');
    $$previousPage.innerHTML = '<<'
    $$previousPage.addEventListener('click' , () => {
        url=info.prev;
        init();
    })
    $$pagination.appendChild($$previousPage);
    $$pagination.appendChild($$nextPage);
}