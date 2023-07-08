const API = " https://api.thecatapi.com/v1/images/search";
const foxsAPI = "https://randomfox.ca/floof/";

const catImg = document.querySelector(".cats-image");
const btnGetCats = document.getElementById("button");

function getMeACat()
    {          
        fetch(API) //Recibe de argumento la URL de la API, como regresa una promesa puedo usar el método .then() 
        .then( res => res.json()) //Cuando cargo la API primero debo convertir mi respuesta a un objeto que pueda entender JS
        .then(data => {
            catImg.setAttribute("src",data[0].url);
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
                catImg.setAttribute("src", fox.image);
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
setInterval(getMeACat, 10000);
setInterval(() => getMeACatAsync(foxsAPI), 4000);