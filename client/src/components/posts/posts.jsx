import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostItem from "./postItem";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import {getPosts, likePost, unlikePost, deletePost, addPost } from "../../redux/actions/post.action";
import PostForm from './postForm';

const Posts = ({
  post: { posts, loading },
  getPosts,
  auth,
  likePost,
  unlikePost,
  deletePost,
  addPost
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
        <PostForm addPost={addPost} />
      <div className="posts">
        {loading ? (
          <Spinner />
        ) : (
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              auth={auth}
              likePost={likePost}
              unlikePost={unlikePost}
              deletePost={deletePost}
            />
          ))
        )}
      </div>
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToMaps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToMaps, { getPosts, likePost, unlikePost, deletePost, addPost })(
  Posts
);
