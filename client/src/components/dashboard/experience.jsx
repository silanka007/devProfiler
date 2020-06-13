import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from 'react-moment';
import { deleteExperience } from "../../redux/actions/profile.action";

const Experience = ({experience, deleteExperience }) => {
  const experienceListing = experience.map((exp) => {
  return(
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '} {
              exp.current && exp.to === null ? ('Present') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
          }
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>)
  });
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experienceListing}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteExperience })(Experience);
