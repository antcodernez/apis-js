//APIS usadas 
const API_quiery_limit_3 = "https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=kora"; //Query parameter de la api con limite de 3 y usando el breed que se podria intuir que son las razas, la documentacion de la api dice que las breed_ids=xxxx son las primeras 4 letras de las razas
//Liga ----> "https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp"

const api_ten_cats = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_GATkX6WfSllkWQlEyUzVuMY6heKK18LpWjV9O8vxkGRbtrui9uvAic2Y1cUZoc4k";
const foxsAPI = "https://randomfox.ca/floof/";



const random_cats_API = "https://api.thecatapi.com/v1/images/search";
const api_key = "api_key=live_QzBg6qTgDRyfYjZulW8KmtNP9Ihi0Nj9ciT8Dg6vgCVFZmMDy4xM99uiujyKvewM";
const api_url_favourites = "https://api.thecatapi.com/v1/favourites";
const cleanAPi_key = "live_QzBg6qTgDRyfYjZulW8KmtNP9Ihi0Nj9ciT8Dg6vgCVFZmMDy4xM99uiujyKvewM";

// const catImg = document.querySelector(".cats-image");
const btnGetCats = document.getElementById("button");
btnGetCats.addEventListener("click", getmeARandomCat);

const favoriteCatsDisplay = document.querySelector(".favorite-cats");
const spanError = document.querySelector(".error");

const btnFavoriteCats = document.querySelector(".icon-menu-favorite-michis");
btnFavoriteCats.addEventListener("click",() => {
    favoriteCatsDisplay.classList.toggle("favorite-cats__active");

    if(favoriteCatsDisplay.classList.contains("favorite-cats__active"))
        {
            console.log("get de los gatos favoritos")
            loadFavoriteCats();                 
        }
});


const imgRandomCat = document.querySelector(".cats-image");


async function getmeARandomCat()
    {
        const res = await fetch(random_cats_API);
        const data = await res.json();
        
        if(res.status == 200)
            {
                console.log("get de un gato aleatorio")
                console.log(data);
                imgRandomCat.setAttribute("src", `${data[0].url}`);
                imgRandomCat.setAttribute("id", `${data[0].id}`);
            }
        else
            {
                spanError.innerText = `Hubo un error ${res.status} al momento de cargar los gatos aleatorios`;
            }
    }

async function loadFavoriteCats()
    {
       const res = await fetch(`${api_url_favourites}?${api_key}`);
       const data = await res.json();
       
       if(res.status !== 200)
            {
                spanError.innerText = `Hubo un error ${res.status} al momento de cargar los gatos favoritos`;
            }
        else
            {
                console.log(data)
            }
    }
// setInterval(getMeACat, 1000);

// Obteniendo los gatos con async y await



let rawBody = JSON.stringify({
    "image_id": "3cp"
});

async function saveFavoriteMichis()
    {
        console.log("post de un gato aleatorio a favoritos");
        
        const res = await fetch(`${api_url_favourites}`, {
                method: "POST",
                headers: {'x-api-key' : 'live_QzBg6qTgDRyfYjZulW8KmtNP9Ihi0Nj9ciT8Dg6vgCVFZmMDy4xM99uiujyKvewM'},
                body : rawBody
            })
        const data = await res;


        if(res.status !== 200)
            {
                spanError.innerText = `Hubo un error ${res.status} al momento de guardar un gato en favoritos`; 
            }
        
    }

        
// const newFavourite = await fetch(
//         "https://api.thecatapi.com/v1/favourites", 
//             {
//                 method: 'POST',
//                 headers: { 'x-api-key': 'YOUR-KEY'} ,
//                 body: rawBody
//             }
//         )
          
// Son asincronas y en intervalo
// setInterval(getMeACat, 10000);
// setInterval(() => getMeACatAsync(foxsAPI), 4000);





















// Codigo para los zorros

// async function fetchData(urlAPI)
//     {
//         const response = await fetch(urlAPI);
//         const data = await response.json();
//         return data;
//     }

// async function getMeAFoxAsync(url)
//     {
//         try
//             {
//                 const fox = await fetchData(url);
//                 createAnimalOnDisplay(fox);
//             }
//         catch(error)
//             {
//                 console.log(error);
//             }
//     }
// const btnFoxs = document.getElementById("foxs");

// btnFoxs.addEventListener("click", () => {
//     getMeAFoxAsync(foxsAPI);
// });