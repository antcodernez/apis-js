const API = "https://api.thecatapi.com/v1/images/search";
const API_quiery_limit_3 = "https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=kora"; //Query parameter de la api con limite de 3 y usando el breed que se podria intuir que son las razas, la documentacion de la api dice que las breed_ids=xxxx son las primeras 4 letras de las razas
//Liga ----> "https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp"

const api_ten_cats = "https://api.thecatapi.com/v1/images/search?limit=10";
const foxsAPI = "https://randomfox.ca/floof/";

const catImg = document.querySelector(".cats-image");
const btnGetCats = document.getElementById("button");

function getMeACat()
    {          
        fetch(api_ten_cats) //Recibe de argumento la URL de la API, como regresa una promesa puedo usar el método .then() 
        .then( res => res.json()) //Cuando cargo la API primero debo convertir mi respuesta a un objeto que pueda entender JS
        .then(data => 
            { 
                for(cat of data)
                    {   
                        let imgCatTag = document.createElement("img");
                        imgCatTag.classList.add("cats-image");
                        imgCatTag.src = cat.url;
                        // containerTag.appendChild(imgCatTag);   

                        document.body.appendChild(imgCatTag);
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
                let imgCatTag = document.createElement("img");
                imgCatTag.classList.add("cats-image");
                imgCatTag.src = fox.image;
                document.body.appendChild(imgCatTag);
                
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

// Son asincronas y en bucle
// setInterval(getMeACat, 10000);
// setInterval(() => getMeACatAsync(foxsAPI), 4000);

