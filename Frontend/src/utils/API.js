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

    {/*
        CODE FROM GIST: https://gist.github.com/6174/6062387
    */}
    let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

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

export const editPost = ({id, title, body}) => {
    return fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, body})
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

export const fetchComments = (postID) => {
    return fetch(`${api}/posts/${postID}/comments/`, {headers})
    .then(res=>res.json())
}

export const makeComment = ({parentId,author,body}) => {

    let timestamp = Date.now()

    {/*
        CODE FROM GIST: https://gist.github.com/6174/6062387
    */}
    let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    return fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({id, parentId, author, body, timestamp})
    }).then(res=> res.json())
}

export const voteComment = (commentID, option) => {
    return fetch(`${api}/comments/${commentID}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res=> res.json())
}

export const editComment = (id, body) => {

    let timestamp = Date.now()
    
    return fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({body, timestamp})
    }).then(res=> res.json())
}

export const deleteComment = (commentID) => {
    return fetch(`${api}/comments/${commentID}`, {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    }).then(res=> res.json())
}

