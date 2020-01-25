//action creators - создатели событий
export const deleteComment = (key) => {
    return {
        type : 'DELETE_COMMENT',
        key : key
    }
};