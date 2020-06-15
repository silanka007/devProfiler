import React from "react";
import Moment from "react-moment";
import auth from "../../redux/reducers/auth.reducer";

const Comment = ({
  postId,
  auth,
  removeComment,
  comment: { _id, date, user, name, avatar, text },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && auth.user._id === user && (
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => removeComment(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
