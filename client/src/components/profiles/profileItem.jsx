import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { avatar, name, _id },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="" />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && ` at ${company}`}{" "}
          </p>
          <p>{location}</p>
          <Link to={`profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <ul>
          {skills &&
            skills.slice(0, 4).map((skill, index) => (
              <li className="text-primary" key={index}>
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ProfileItem;
