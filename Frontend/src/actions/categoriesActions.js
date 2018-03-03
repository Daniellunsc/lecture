export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ERROR_FETCH_CATEGORIES = 'ERROR_FETCH_CATEGORIES'

export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        categories: categories
    }        
}

export const setErrorCategories = (error) => {
    return {
        type: ERROR_FETCH_CATEGORIES,
        error,    
    }
}
