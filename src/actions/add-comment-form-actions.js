let nextCommentId = 4;

//action creators - создатели событий
export const changeNewCommentText = (value) => {
    return {
        type : 'CHANGE_NEW_COMMENT_TEXT',
        value : value
    }
};

export const changeNewCommentAuthor = (value) => {
    return {
        type : 'CHANGE_NEW_COMMENT_AUTHOR',
        value : value
    }
};

export const addNewComment = (event) => {
    return {
        type : 'ADD_NEW_COMMENT',
        id : nextCommentId++,
        event : event
    }
};

export const cancelAddComment = (event) => {
  return {
      type : 'CANCEL_ADD_COMMENT',
      event : event,
  }
};

