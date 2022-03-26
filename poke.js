
const fetchPokemon = () => { /* FUNCION QUE RETORNA DATOS DEL API */
    const pokeName = document.getElementById("pokeName"); 
    //Tomo el valor del input a traves de su id
    let pokeInput = pokeName.value.toLowerCase();
    /* creamos la variable que contendra lo escrito en el input y ademas llamamos la funcion LowerCase para que lo escrito
    siempre este en minusculas */
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    //Se llama a la API y se concatena lo del input
    fetch(url).then((res) => { 
        /* Aqui se genera la promesa y me retorna el estatus de esta */
        /* console.log(res); //para checar si se ha conectado al API*/
        /*  si el estatus es 200 significa que se a consultado al API correctamente */
        if(res.status != 200){
            /* console.log(res); */
            alert("¡No existe el Pokémon!");
            pokeImage("media/sad-pikachu.gif");
            /* Para eliminar lo de habilidades y movimientos */
            const antiguo = document.getElementById("info");
            antiguo.parentNode.removeChild(antiguo);
            pokeNombre("Pokémon no encontrado...");

            setTimeout(refrescar, 120);
            function refrescar(){
                //Actualiza la página
                location.reload();
              }
            
        }else{
            return res.json();
        }

        return res.json();
        
    }).then((data) => {
        /* una vez que generemos la promesa a partir de la peticion y esta ya se halla conectado,
        entonces muestrame la informacion */
        console.log(data);
        var pokeImg = data.sprites.front_default; 
        //aqui saco la imagen del pokemon a partir del objeto del API
        var pokeName = data.name;
        var pokeAbili = data.abilities[0].ability.name;
        var pokeAbili2 = data.abilities[1].ability.name;
        var pokeAltura = data.height;
        var pokePeso = data.weight;
        console.log(pokePeso);
        var pokeExp = data.base_experience;
        var pokeHp = data.stats[0].base_stat;
        var pokeAtaque = data.stats[1].base_stat;
        var pokeDefensa = data.stats[2].base_stat;
        var pokeVelocidad = data.stats[5].base_stat;
        var moves = new Array(4);
        /* Creacion de vector y asignacion de valores a traves de un recorrido en el vector del API */
        for(var i =0; i<4 ; i++){
            moves[i] = data.moves[i].move.name;
        }
        pokeMoves(moves);
        pokeAbilidad(pokeAbili, pokeAbili2);
        /* console.log(pokeImg); //imprime el resultado de pokeImg */
        pokeNombre(pokeName);
        pokCaracteristicas(pokeExp,pokeAltura,pokePeso,pokeAtaque,pokeHp,pokeDefensa,pokeVelocidad);
        pokeImage(pokeImg);
        //mando a llamar la funcion de abajo que cambia imagen
    })
}

/* Funcion para cambiar la imagen del pokedex */
const pokeImage = (url) => {
    var pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const pokCaracteristicas = (url,url2,url3,url4,url5,url6,url7) => {
    const base = document.getElementById("experienciaCombate");
    base.textContent = url + (" pts");
    const altura = document.getElementById("altura");
    if(url2 < 10){
        altura.textContent = (".") + url2 + (" mts");
    }else{
        altura.textContent =  url2 + ("0")  + (" cms");
    }
    const peso = document.getElementById("peso")
    if(url2 < 10){
        peso.textContent = (".") + url3 + (" kgs");
    }else{
        peso.textContent =  url3 + ("0")  + (" grs");
    }
    const ataque = document.getElementById("ataque");
    const Hp = document.getElementById("hp");
    ataque.textContent = url4 + (" pts");
    Hp.textContent = url5 + (" pts");
    const defensa = document.getElementById("defensa");
    defensa.textContent = url6 + (" pts");
    const velocidad = document.getElementById("velocidad");
    velocidad.textContent = url7 + (" pts");
}

const pokeNombre = (url) => {
    /* Creo la funcion que cambiara el texto del nombre del pokemon */
    const pokeNom = document.getElementById("name");
    /* se crea una constante la cual se enlazara al h2 del html */
    pokeNom.textContent = url;
    /* aqui se remplaza el texto de acuerdo al resultado de la api */
}
const pokeAbilidad = (url , url2) => {
    const pokeAbilitie = document.getElementById("abilitie");
    const pokeAbilitie2 = document.getElementById("abilitie2");
    pokeAbilitie.textContent = ("> ") + url;
    pokeAbilitie2.textContent = ("> ") +  url2;
}

const pokeMoves = (vectorApi) => {
    var vector = new Array(4);
    //obtencion de los parrafos del html a traves de un ciclo for y un vector
    for (let index = 0; index < 4; index++) {
        vector[index] = document.getElementById(`movimiento${index}`);
        /* console.log(vector[index]); */
    }
    //Una vez obtenidos los valores se procede a reemplazar por los del api
    for (let index = 0; index < 4; index++) {
        vector[index].textContent = ("> ") + vectorApi[index];
    }
}


