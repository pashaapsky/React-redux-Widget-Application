import React from 'react';
import { connect } from "react-redux";

import AddComment from '../components/add-comment-form';
import CommentsList from '../components/comments-list';

import {changeNewCommentText, changeNewCommentAuthor, addNewComment, cancelAddComment} from '../actions/add-comment-form-actions';
import {deleteComment} from "../actions/comment-list-actions";


let Widget = (props) => {
    const {state, changeNewCommentText, changeNewCommentAuthor, addNewComment, cancelAddComment, deleteComment} = props;
    console.log('rendering');

    const saveStateToLocalStorage = (comments) => {
        const local_storage_name = 'Widget_app_state';

        localStorage.setItem(local_storage_name, JSON.stringify(comments));  //сохраняем объект JSON в харнилище
    };

    saveStateToLocalStorage(state.comments);


    if ((state.comments.length === 0))
        return (
            <div>
                <AddComment
                    state = {state}
                    changeNewCommentText = {changeNewCommentText}
                    changeNewCommentAuthor = {changeNewCommentAuthor}
                    addNewComment = {addNewComment}
                    cancelAddComment ={cancelAddComment}
                />

                <p style={{textAlign : "center"}}>Комментарии еще не были добавлены</p>

                <CommentsList
                    comments = {state.comments}
                    deleteComment = {deleteComment}
                />

                <button
                    className={'add-comment-btn js-add-comment-btn'}
                    onClick={event => {
                        event.preventDefault();

                        const form_elem = document.querySelector('.js-new-comment-form');

                        form_elem.classList.remove('hide');
                    }}
                >Оставить новый комментарий</button>
            </div>
        );
    else
        return (
        <div>
            <AddComment
                state = {state}
                changeNewCommentText = {changeNewCommentText}
                changeNewCommentAuthor = {changeNewCommentAuthor}
                addNewComment = {addNewComment}
                cancelAddComment ={cancelAddComment}
            />

            <CommentsList
                comments = {state.comments}
                deleteComment = {deleteComment}
            />

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
};

    const mapStateToProps = (state) => {
        return {
            state : state
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            changeNewCommentText : (value) => dispatch(changeNewCommentText(value)),
            changeNewCommentAuthor : (value) => dispatch(changeNewCommentAuthor(value)),
            addNewComment : (event) => dispatch(addNewComment(event)),
            cancelAddComment : (event) => dispatch(cancelAddComment(event)),
            deleteComment : (key) => dispatch(deleteComment(key))
        }
    };

    Widget = connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Widget);


export default Widget;