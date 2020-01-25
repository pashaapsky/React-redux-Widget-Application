import React from "react";
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { combineReducers } from "redux";

//импорт стилей
import './styles.css';
import './widget.css';

import formReducer from './reducers/add-comment-form-reducer';

import Widget from './containers/widget';

// {comments}
// {id : 1, authorName : 'author1', commentText : 'Комментарий1', commentDate : Date().split(' ').slice(1,5).join(' ')},
// {id : 2, authorName : 'author2', commentText : 'Комментарий2', commentDate : Date().split(' ').slice(1,5).join(' ')},
// {id : 3, authorName : 'author3', commentText : 'Комментарий3', commentDate : Date().split(' ').slice(1,5).join(' ')}

//по умолчанию комментариев нет
let comments = [];

//проверка данных в localStorage
if(localStorage.length > 0) {
    for (let k = 0; k < localStorage.length; k++) {
        //проверка на соответсвие ключа
        if ((localStorage.key(k) === 'Widget_app_state') && (localStorage['Widget_app_state'].length !== 2)) {
            comments = JSON.parse(localStorage.getItem('Widget_app_state'));
        }
    }
}

//инициализация начального состояния приложения
const initialState = {
    comments : comments,

    newComment: {
        newCommentText : '',
        newCommentAuthorName : '',
    }
};


const store = createStore(formReducer, initialState);

const saveStateToLocalStorage = (comments) => {
    const local_storage_name = 'Widget_app_state';

    localStorage.setItem(local_storage_name, JSON.stringify(comments));  //сохраняем объект JSON в харнилище
};

ReactDOM.render(
    <Widget store={store} />,
    document.querySelector('.app-container')
);