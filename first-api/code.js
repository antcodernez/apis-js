const catsAPI = "https://cataas.com/api/cats?limit=10&skip=0";

const foxsAPI = "https://randomfox.ca/floof"

const ducksAPI = "https://random-d.uk/api";

const options =
    {
        method: "GET"

    }

async function fetData(urlAPI)
    {
        const response = await fetch(urlAPI, options);
        const data = await response.json();
        return data;
    }

async function aver()
    {
        try
            {
                const cats = await fetData(catsAPI)
                return cats
            }
        catch(error)
            {
                console.log(error)
            }
    }