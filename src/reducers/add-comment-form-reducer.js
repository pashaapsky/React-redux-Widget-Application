const formReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_NEW_COMMENT_TEXT':
            return {
                    comments : state.comments,

                    newComment : {
                        newCommentText : action.value,
                        newCommentAuthorName : state.newComment.newCommentAuthorName
                    }
            };


        case 'CHANGE_NEW_COMMENT_AUTHOR':
            return {
                comments : state.comments,

                newComment : {
                    newCommentText : state.newComment.newCommentText,
                    newCommentAuthorName : action.value
                }
            };

        case 'ADD_NEW_COMMENT':
            //проверяем заполнены ли все поля ввода в новом комментарии
            if (state.newComment.newCommentText && state.newComment.newCommentAuthorName){
                action.event.classList.add('hide');

                return {
                    comments : [
                        ...state.comments,
                        {id : action.id, authorName : state.newComment.newCommentAuthorName, commentText : state.newComment.newCommentText, commentDate : Date().split(' ').slice(1,5).join(' ')}
                    ],

                    newComment : {
                        newCommentText : '',
                        newCommentAuthorName : ''
                    }
                };
            }
            else {
                alert('Не все поля заполнены');
                return state;
            }

        case 'CANCEL_ADD_COMMENT' :
            action.event.classList.add('hide');

            return {
                comments : state.comments,

                newComment : {
                    newCommentText : '',
                    newCommentAuthorName : ''
                }
            };

        case 'DELETE_COMMENT':
            let newComments = [];    //заготовка для нового массива

            const oldComments = state.comments;  //старый массив комментарий

            //удаляем комментарий с id = action.id
            oldComments.forEach(value => {
                if (value.id !== action.key){
                    newComments.push(value);
                }
            });

            return {
                comments : newComments,
                newComment : state.newComment
            };

        default:
            return state;
    }
};


export default formReducer;