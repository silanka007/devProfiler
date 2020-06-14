import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostItem from "./postItem";
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/post.action";
import Spinner from "../layouts/spinner";
import { likePost, unlikePost, deletePost } from "../../redux/actions/post.action";

const Posts = ({
  post: { posts, loading },
  getPosts,
  auth,
  likePost,
  unlikePost,
  deletePost,
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

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

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

export default connect(mapStateToMaps, { getPosts, likePost, unlikePost, deletePost })(
  Posts
);
