//APIS usadas 
const API_quiery_limit_3 = "https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=kora"; //Query parameter de la api con limite de 3 y usando el breed que se podria intuir que son las razas, la documentacion de la api dice que las breed_ids=xxxx son las primeras 4 letras de las razas
//Liga ----> "https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp"

const api_ten_cats = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_GATkX6WfSllkWQlEyUzVuMY6heKK18LpWjV9O8vxkGRbtrui9uvAic2Y1cUZoc4k";
const foxsAPI = "https://randomfox.ca/floof/";


const api_key = "live_hNVtYB4DspZW7WNF6QbKkZeb0HQQt4c8BcYvcQ1WUBiJUwq3sdr1F0YeF85VhOEd";
const random_cats_API = "https://api.thecatapi.com/v1/images/search";
const api_url_favourites = "https://api.thecatapi.com/v1/favourites";

const btnGetCats = document.getElementById("button");
btnGetCats.addEventListener("click", getmeARandomCat);

const favoriteCatsDisplay = document.querySelector(".favorite-cats");
const spanError = document.querySelector(".error");

const btnFavoriteCats = document.querySelector(".icon-menu-favorite-michis");
const containerFavoriteCats = document.querySelector(".favorite-cats__container-items");
const catsFavoritesItems = document.querySelectorAll(".item-favorite-cats");

function activeDisplayFavMichis()
    {
        favoriteCatsDisplay.classList.toggle("favorite-cats__active");

        if(favoriteCatsDisplay.classList.contains("favorite-cats__active"))
            {
                console.log("get de los gatos favoritos")
                loadFavoriteCats();                 
            }
        else   
            {
                deleteNodeChildsOnFavoriteCats() 
            }
    }
btnFavoriteCats.addEventListener("click", activeDisplayFavMichis);

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
       const res = await fetch(api_url_favourites, {
        method: "GET",
        headers: {
            "x-api-key": api_key
        }
       });
       const dataFav = await res.json();
       
       if(res.status !== 200)
            {   
                spanError.innerText = `Hubo un error ${res.status} al momento de cargar los gatos favoritos`;
            }
        else
            {
                console.log(dataFav);
                renderFavoriteCats(dataFav);
            }
    }
// setInterval(getMeACat, 1000);

async function saveFavoriteMichis()
    {
        console.log("post de un gato aleatorio a favoritos");
        
        const res = await fetch(api_url_favourites, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "x-api-key": api_key
                    },
                    body : JSON.stringify({image_id: imgRandomCat.getAttribute("id")})
                })
        const data = await res;

        if(data.status == 200 && !favoriteCatsDisplay.classList.contains("favorite-cats__active"))
                {
                    activeDisplayFavMichis();                    
                }
        else if (data.status == 200 && favoriteCatsDisplay.classList.contains("favorite-cats__active"))
                {
                    deleteNodeChildsOnFavoriteCats();
                    loadFavoriteCats();
                }
        if(res.status !== 200)
            {
                spanError.innerText = `Hubo un error ${res.status} al momento de guardar un gato en favoritos ${data}`; 
            }
        
    }
     
function renderFavoriteCats(cats)
    {
        for(cat of cats)
            {
                let containerCat = document.createElement("div");
                containerCat.classList.add("item-favorite-cats");
                let imgCat = document.createElement("img");
                imgCat.setAttribute("src", `${cat.image.url}`);
                // data[0].image.url
                imgCat.classList.add("img-favorite-cat");
                let button = document.createElement("button");
                button.classList.add("delete-cat-on-favorites");
                button.textContent = "eliminar de favoritos";
                button.setAttribute("onclick", "deleteCatOnFavorites()")
                button.setAttribute("id", `${cat.id}`);
                containerCat.append(imgCat, button);
                containerFavoriteCats.append(containerCat);
            }
    }
function deleteNodeChildsOnFavoriteCats()
    {
        for (let i = containerFavoriteCats.childNodes.length - 1;  i >= 0; i--)
            {
                containerFavoriteCats.removeChild(containerFavoriteCats.childNodes[i]);
            }
    }

function deleteCatOnFavorites()
    {
        console.log("Delete de un gato"); 
        const btnAllFavoritesCats = document.querySelectorAll(".delete-cat-on-favorites");
        btnAllFavoritesCats.forEach(item => {
            item.addEventListener("click", e => {
                deleteWithIdCatOnFavorites(e.target.getAttribute("id"));
            })
        })
    }

async function deleteWithIdCatOnFavorites(id)
    {
        
        const res = await fetch(`${api_url_favourites}/${id}`, 
                {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json', 'x-api-key': api_key }
                });

        const data = await res;

        if(data.status == 200)
                {
                    const res = await fetch(api_url_favourites, {
                        method: "GET",
                        headers: {
                            "x-api-key": api_key
                        }                    
                    });
                    const cats = await res.json();             
                    deleteNodeChildsOnFavoriteCats();
                    renderFavoriteCats(cats);
                    console.log("Se ha eliminado correctamente el gato de favoritos master");
                }
        if(res.status !== 200)
            {
                spanError.innerText = `Hubo un error ${res.status} al momento de eliminar un gato en favoritos ${data}`; 
            }

    }
getmeARandomCat();


console.log("Hola");