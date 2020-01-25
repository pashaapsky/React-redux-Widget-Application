/*
Напишите виджет комментариев на React со следующей функциональностью:

1. Отображение списка комментариев: автор, текст, дата и время.
2. Добавление нового комментария (поля для ввода: имя автора, текст).
3. Удаление комментария (кнопка удаления рядом с каждым комментарием).
4. Сохранение состояния приложения в localStorage в формате JSON (при перезагрузке страницы все добавленные комментарии должны подтягиваться оттуда).

*/
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './widget.css';

//функциональные комоненты React
import {Text_comment_label, Author_name_label, Widget_comment_item} from './react_components'


class Widget extends React.Component {
    constructor(props){
        super(props);

        //по умолчанию комментариев нет
        //шаблон {comment_author : 'author1', comment_text : 'Комментарий1', comment_date : Date().split(' ').slice(1,5).join(' ')},
        let comments = [];

        if(localStorage.length > 0) {
            for (let k = 0; k < localStorage.length; k++) {
                //проверка на соответсвие ключа
                if ((localStorage.key(k) === 'Widget_app_state') && (localStorage['Widget_app_state'].length !== 2)) {
                    comments = JSON.parse(localStorage.getItem('Widget_app_state'));
                }
            }
        }

        this.state = {
            //комментарии
            comments: comments,

            //новый комментарий
            new_comment: {
                new_comment_text : '',
                new_comment_author : '',
            }
        };
    }

    save_state_to_localstorage(comments) {
        const local_storage_name = 'Widget_app_state';

        localStorage.setItem(local_storage_name, JSON.stringify(comments));  //сохраняем объект JSON в харнилище
    }


    //метод добавления нового комментария
    add_new_comment(){
        const comments = this.state.comments;
        const new_comment = this.state.new_comment;

        if (new_comment.new_comment_author && new_comment.new_comment_text){
            comments.push({
                comment_author : this.state.new_comment.new_comment_author,
                comment_text : this.state.new_comment.new_comment_text,
                comment_date : Date().split(' ').slice(1,5).join(' ')
            });

            //обнуляем поля ввода - input`s
            new_comment.new_comment_text = '';
            new_comment.new_comment_author = '';

            console.log(new_comment);

            this.setState({comments : comments, new_comment : new_comment});
            console.log(this.state);
            //сохраняем состояние в localStorage
            this.save_state_to_localstorage(comments);
        }
        else {
            alert('Не все поля заполнены верно');
            return 'error'
        }
    }

    //удалить комментарий
    delete_comment(key){
        const old_comments = this.state.comments;  //старый массив комментарий
        let new_comments = [];                     //заготовка для нового массива

        //удаляем комментарий с ключом key
        old_comments.forEach((value, i) => {
            if (key !== i){
                new_comments.push(value);
            }
        });

        this.setState({comments : new_comments});

        //сохраняем состояние в localStorage
        this.save_state_to_localstorage(new_comments);
    }

    render() {
        //если комментариев нет
        if (this.state.comments.length === 0){
            return (
                <div>
                    <form className={"new-comment-form js-new-comment-form hide"}>
                        <Text_comment_label
                            value = {this.state.new_comment.new_comment_text}
                            onChange = {event => {
                                this.setState({
                                    new_comment :
                                        {new_comment_text : event.target.value,
                                            new_comment_author : this.state.new_comment.new_comment_author}
                                })
                            }}
                        />

                        <Author_name_label
                            value={this.state.new_comment.new_comment_author}
                            onChange={event => {
                                this.setState({
                                    new_comment : {
                                        new_comment_text : this.state.new_comment.new_comment_text,
                                        new_comment_author : event.target.value
                                    }
                                })
                            }}
                        />

                        <button
                            className={"new-comment-form__btn"}
                            type={"submit"}
                            onClick={event => {
                                event.preventDefault();

                                //получаем родительский элемент
                                const form_elem = event.currentTarget.closest('.js-new-comment-form');

                                //вызываем метод добавления комментария
                                const result = this.add_new_comment();

                                //скрываем высплывающее окно если не вернулся error
                                if (result !== 'error')
                                    form_elem.classList.add('hide');
                            }}
                        >Оставить комментарий</button>

                        <button
                            className={"new-comment-form__btn"}
                            type={"button"}
                            onClick={event => {
                                event.preventDefault();

                                //получаем родительский элемент
                                const form_elem = event.currentTarget.closest('.js-new-comment-form');

                                //скрываем высплывающее окно
                                form_elem.classList.add('hide');

                                //обновляем состояния на нулевые
                                this.setState({
                                    new_comment : {
                                        new_comment_text : '',
                                        new_comment_author : ''
                                    }
                                })
                            }}
                        >Отмена</button>
                    </form>

                    <p style={{textAlign : "center"}}>Комментарии еще не были добавлены</p>

                    <button
                        className={'add-comment-btn js-add-comment-btn'}
                        onClick={event => {
                            event.preventDefault();

                            const form_elem = document.querySelector('.js-new-comment-form');

                            form_elem.classList.remove('hide');
                        }}
                    >Оставить новый комментарий</button>
                </div>

            )
        }
        //если комментарии появились
        else
        return (
            <div>
                <h2>{this.state.new_comment.new_comment_text}</h2>

                <form className={"new-comment-form js-new-comment-form hide"}>
                    <Text_comment_label
                        value = {this.state.new_comment.new_comment_text}
                        onChange = {event => {
                            this.setState({
                                new_comment :
                                    {new_comment_text : event.target.value,
                                        new_comment_author : this.state.new_comment.new_comment_author}
                            })
                        }}
                    />

                    <Author_name_label
                        value={this.state.new_comment.new_comment_author}
                        onChange={event => {
                            this.setState({
                                new_comment : {
                                    new_comment_text : this.state.new_comment.new_comment_text,
                                    new_comment_author : event.target.value
                                }
                            })
                        }}
                    />

                    <button
                    className={"new-comment-form__btn"}
                    type={"submit"}
                    onClick={event => {
                        event.preventDefault();

                        //получаем родительский элемент
                        const form_elem = event.currentTarget.closest('.js-new-comment-form');

                        //вызываем метод добавления комментария
                        const result = this.add_new_comment();

                        //скрываем высплывающее окно если не вернулся error
                        if (result !== 'error')
                            form_elem.classList.add('hide');
                    }}
                    >Оставить комментарий</button>

                    <button
                    className={"new-comment-form__btn"}
                    type={"button"}
                    onClick={event => {
                        event.preventDefault();

                        //получаем родительский элемент
                        const form_elem = event.currentTarget.closest('.js-new-comment-form');

                        //скрываем высплывающее окно
                        form_elem.classList.add('hide');

                        //обновляем состояния на нулевые
                        this.setState({
                            new_comment : {
                                new_comment_text : '',
                                new_comment_author : ''
                            }
                        })
                    }}
                    >Отмена</button>
                </form>

                <ul className={"comments-list"}>
                    {
                        this.state.comments.map((comment, i) => {
                            return (
                                <Widget_comment_item
                                key={i}
                                comment_text = {comment.comment_text}
                                delete_comment = {this.delete_comment.bind(this, i)}
                                comment_author = {comment.comment_author}
                                comment_date = {comment.comment_date}
                                />
                            );
                        })
                    }
                </ul>

                <button
                className={'add-comment-btn js-add-comment-btn'}
                onClick={event => {
                    event.preventDefault();

                    const form_elem = document.querySelector('.js-new-comment-form');

                    form_elem.classList.remove('hide');
                }}
                >Оставить новый комментарий</button>
            </div>
        )}
}

ReactDOM.render(
    <Widget/>,
    document.querySelector('.app-container')
);