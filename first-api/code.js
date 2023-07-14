const API = "https://api.thecatapi.com/v1/images/search";
const API_quiery_limit_3 = "https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=kora"; //Query parameter de la api con limite de 3 y usando el breed que se podria intuir que son las razas, la documentacion de la api dice que las breed_ids=xxxx son las primeras 4 letras de las razas
//Liga ----> "https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp"

const api_ten_cats = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_GATkX6WfSllkWQlEyUzVuMY6heKK18LpWjV9O8vxkGRbtrui9uvAic2Y1cUZoc4k";
const foxsAPI = "https://randomfox.ca/floof/";

// const catImg = document.querySelector(".cats-image");
const btnGetCats = document.getElementById("button");
const btnFavoriteCats = document.querySelector(".icon-menu-favorite-michis");
const randomCatsNode = document.querySelector(".random-cats");
const favoriteCatsDisplay = document.querySelector(".favorite-cats");

btnFavoriteCats.addEventListener("click",() => {
    favoriteCatsDisplay.classList.toggle("favorite-cats__active")
});

function getMeACat()
    {          
        fetch(API) //Recibe de argumento la URL de la API, como regresa una promesa puedo usar el método .then() 
        .then( res => res.json()) //Cuando cargo la API primero debo convertir mi respuesta a un objeto que pueda entender JS
        .then(data => 
            { 
                for(cat of data)
                    {   
                        createAnimalOnDisplay(cat);

                        //Se creo una funcion para optimizar el codiog
                        // let imgCatTag = document.createElement("img");
                        // let btncat = document.createElement("button");
                        // let containerCatImg = document.createElement("article");

                        // imgCatTag.classList.add("cats-image");
                        // imgCatTag.src = cat.url;
                        
                        // btncat.classList.add("button-add__michi_favorite");
                        // btncat.innerHTML = "agregar michis favoritos";
                        // btncat.setAttribute("onclick", "addTofavorites()");
                        
                        // containerCatImg.append(imgCatTag, btncat);
                        // randomCatsNode.append(containerCatImg);
                        
                        // containerTag.appendChild(imgCatTag);   
                        //document.body.appendChild(containerCatImg); 
                        // Insertar dentro del body en el ultimo hijo

                    }
            })//Me devuelve una promesa, hago lo que quiera con mi respuesta de la API
        .catch(error => console.log(error));

    }

// setInterval(getMeACat, 1000);

// Obteniendo los gatos con async y await

async function fetchData(urlAPI)
    {
        const response = await fetch(urlAPI);
        const data = await response.json();
        return data;
    }

async function getMeACatAsync(url)
    {
        try
            {
                const fox = await fetchData(url);
                createAnimalOnDisplay(fox);
            }
        catch(error)
            {
                console.log(error);
            }
    }
const btnDucks = document.getElementById("foxs");

btnDucks.addEventListener("click", () => {
    getMeACatAsync(foxsAPI);
});
btnGetCats.addEventListener("click", getMeACat);

function addTofavorites()
    {
        alert("hola xd");
    }

function createAnimalOnDisplay(jsonToRender)
    {
        let imgCatTag = document.createElement("img");
        let btncat = document.createElement("button");
        let containerCatImg = document.createElement("article");

        imgCatTag.classList.add("cats-image");
        imgCatTag.src = jsonToRender.image || jsonToRender.url;
                        
        btncat.classList.add("button-add__michi_favorite");
        btncat.innerHTML = "agregar a favoritos";
        btncat.setAttribute("onclick", "addTofavorites()");
                        
        containerCatImg.append(imgCatTag, btncat);
        randomCatsNode.append(containerCatImg);
    }
// Son asincronas y en intervalo
// setInterval(getMeACat, 10000);
// setInterval(() => getMeACatAsync(foxsAPI), 4000);
