const api = "http://localhost:3001"

const headers = { 'Authorization': 'UdacityRocks!' }

export const getCategories = () => {
    return fetch(`${api}/categories`, {headers})
        .then(res=>res.json())
        .then(data=>data.categories)    
}

export const getAllPosts = () => {
    return fetch(`${api}/posts`, {headers})
        .then(res=>res.json())
}

export const getPostByCategory = (category) => {
    return fetch(`${api}/${category}/posts`, {headers})
        .then(res=>res.json())
}

export const MakePost = ({title, body, author, category}) => {

    let timestamp = Date.now()

    let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    {/*
        CODE FROM GIST: https://gist.github.com/6174/6062387
    */}
   

    return fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({id, timestamp, title, body, author, category})
    }).then(res=> res.json())
}

export const fetchPost = (postID) => {

    return fetch(`${api}/posts/${postID}`, {headers})
        .then(res=>res.json())

}

export const votePost = (postID, option) => {
    return fetch(`${api}/posts/${postID}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res=> res.json())
}

export const deletePost = (postID) => {
    return fetch(`${api}/posts/${postID}`, {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    }).then(res=> res.json())
}