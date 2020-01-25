import React from "react";

const AddComment = (props) => {
    const {changeNewCommentText, changeNewCommentAuthor, addNewComment, saveState, cancelAddComment, state} = props;

    return (
        <form className={"new-comment-form js-new-comment-form hide"}>
            <label className={"new-comment-form__label"}>Введите текст комментария
                <textarea
                    className={"label__textarea"}
                    name={"comment-text"}
                    placeholder={"Текст комментария"}
                    required={true}
                    value = {state.newComment.newCommentText}
                    onChange={event => {
                        changeNewCommentText(event.target.value)
                    }}
                />
            </label>

            <label className={"new-comment-form__label"}>Введите имя автора
                <input
                    type={"text"}
                    className={"label__input"}
                    name={"author-name"}
                    placeholder={"Ваше имя"}
                    required={true}
                    value= {state.newComment.newCommentAuthorName}
                    onChange={event => {
                        changeNewCommentAuthor(event.target.value);
                    }}
                />
            </label>

            <button
                className={"new-comment-form__btn"}
                type={"submit"}
                onClick={event => {
                    event.preventDefault();

                    const form_elem = event.currentTarget.closest('.js-new-comment-form');

                    addNewComment(form_elem);
                }}
            >Оставить комментарий</button>

            <button
                className={"new-comment-form__btn"}
                type={"button"}
                onClick={event => {
                    event.preventDefault();

                    const form_elem = event.currentTarget.closest('.js-new-comment-form');

                    cancelAddComment(form_elem);
                }}
            >Отмена</button>
        </form>
    )
};

export default AddComment;
