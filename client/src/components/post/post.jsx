import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { getPost, addComment, removeComment } from "../../redux/actions/post.action";
import Spinner from "../layouts/spinner";
import CommentForm from "./commentForm";
import Comment from "./comment";

const Post = ({ auth, getPost, addComment, removeComment, match, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.post_id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Go back to Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
          </p>
        </div>
      </div>
      <CommentForm addComment={addComment} postId={post._id} />
      <div className="comments">
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <Comment comment={comment} auth={auth} key={comment._id} postId={post._id} removeComment={removeComment} />
          ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, addComment, removeComment })(Post);
