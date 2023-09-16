const urlBase = "http://localhost:9222/";


const fetchDataAPi = async () =>
    {
        const data = await fetch(`http://localhost:9222/api/v1/products`)
        const res = await data;

        console.log(res);
    }

fetchDataAPi();