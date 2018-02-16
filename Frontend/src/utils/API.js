const api = "http://localhost:3001"

const headers = { 'Authorization': 'UdacityRocks!' }

export const getCategories = () => {
    return fetch(`${api}/categories`, {headers})
        .then(res=>res.json())
        .then(data=>data.categories)
       
}