export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'

export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        posts
    }
}

export const orderPosts = (posts) => (
    dispatch => {

        dispatch({
            type: SET_POSTS,
            posts: []
        })
        dispatch({
            type: SET_POSTS,
            posts
        })

    }
)
    