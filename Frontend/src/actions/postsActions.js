export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const ALTER_POST = 'ALTER_POST'
export const POST_ERRORS = 'POST_ERRORS'
export const SET_POST_ORDER = 'SET_POST_ORDER'

export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        posts
    }
}

export const setPostErrors = (error) => {
    return {
        type: POST_ERRORS,
        error
    }
}

export const addPost = (post) => {
    return{
        type: ADD_POST,
        post
    }
}

export const setPostOrder = (postOrder, asc) => {
    return{
        type: SET_POST_ORDER,
        payload: {
            postOrder,
            asc
        }
    }
}

export const alterPost = (post) => {
    return {
        type: ALTER_POST,
        post
    }
}