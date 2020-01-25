import React from "react";

const CommentsList = (props) => {
    // console.log(props);
    const { comments, deleteComment } = props;

    return (
        <ul className={"comments-list"}>
            {
                comments.map(comment => {
                    return (
                        <li className={"comments-list__item"} key={comment.id}>
                            <div className={"item"}>
                                <p className={"item__text"}>
                                    {comment.commentText}
                                </p>

                                <button
                                    type="button"
                                    className={"item__del-btn"}
                                    aria-label={"Удалить комментарий"}
                                    onClick={event => {
                                        event.preventDefault();

                                        deleteComment(comment.id);
                                    }}
                                />
                            </div>

                            <div className={"item-props"}>
                                <span className={"item-props__author"}>
                                    {comment.authorName}
                                </span>

                                <span className={"item-props__date"}>
                                    {comment.commentDate}
                                </span>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    )
};

export default CommentsList;