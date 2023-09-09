import random_cats_API from "./first-api/code";

const api = axios.create({
   baseURL: random_cats_API, 
});

console.log(api);

export default api;