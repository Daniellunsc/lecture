export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ALTER_COMMENT_COUNT = 'ALTER_COMMENT_COUNT'
export const ALTER_COMMENT = 'ALTER_COMMENT'

export const setcomments = (comments) => {
    return{
        type: SET_COMMENTS,
        comments
    }
}

export const alterCommentCount = (post_id, value) => {
    return{
        type: ALTER_COMMENT_COUNT,
        post_id,
        value,
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

export const AddCommentToStore = (comment, post_id, value) => dispatch => (
    dispatch(addComment(comment)),
    dispatch(alterCommentCount(post_id, value))
)