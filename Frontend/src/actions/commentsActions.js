export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ALTER_COMMENT = 'ALTER_COMMENT'
export const SET_EDITING_ID = 'SET_EDITING_ID'

export const setcomments = (comments) => {
    return{
        type: SET_COMMENTS,
        comments
    }
}

export const alterComment = (comment) => {
    return{
        type: ALTER_COMMENT,
        comment
    }
}

export const addComment = (comment) => {
    return{
        type: ADD_COMMENT,
        comment
    }
}

export const markAsEditing = (idcomment) => {
    return{
        type: SET_EDITING_ID,
        idcomment
    }
}
