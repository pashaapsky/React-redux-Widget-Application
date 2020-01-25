import React from 'react';

const Text_comment_label = (props) => {
    return (
        <label className={"new-comment-form__label"}>Введите текст комментария
            <textarea
                className={"label__textarea"}
                name={"comment-text"}
                placeholder={"Текст комментария"}
                required={true}
                value = {props.value}
                onChange = {props.onChange}
            />
        </label>
    )
};

const Author_name_label = (props) => {
    return (
        <label className={"new-comment-form__label"}>Введите имя автора
            <input
                type={"text"}
                className={"label__input"}
                name={"author-name"}
                placeholder={"Ваше имя"}
                required={true}
                value = {props.value}
                onChange = {props.onChange}
            />
        </label>
    )
};

const Widget_comment_item = (props) => {
    return (
    <li className={"comments-list__item"}>
        <div className={"item"}>
            <p className={"item__text"}>
                {props.comment_text}
            </p>

            <button
                type="button"
                className={"item__del-btn"}
                aria-label={"Удалить комментарий"}
                onClick={props.delete_comment}  //удаляем состояние
            />
        </div>

        <div className={"item-props"}>
            <span className={"item-props__author"}>
                {props.comment_author}
            </span>

            <span className={"item-props__date"}>
                {props.comment_date}
            </span>
        </div>
    </li>
    )
};


export { Text_comment_label, Author_name_label, Widget_comment_item };