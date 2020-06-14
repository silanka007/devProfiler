import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../redux/actions/profile.action";
import Spinner from "../layouts/spinner";
import ProfileTop from "./profileTop";

const Profile = ({
  match,
  getProfileById,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.user_id);
  }, [getProfileById, match]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark ">
                Edit Profile
              </Link>
            )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
