import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from 'react-moment'

const Experience = ({experience}) => {
  const experienceListing = experience.map((exp) => {
  return(
    <tr>
      <td>{exp.company}</td>
      <td class="hide-sm">{exp.title}</td>
      <td class="hide-sm">
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '} {
              exp.current && exp.to === null ? ('Present') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
          }
      </td>
      <td>
        <button class="btn btn-danger">Delete</button>
      </td>
    </tr>)
  });
  return (
    <Fragment>
      <h2 class="my-2">Experience Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experienceListing}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
