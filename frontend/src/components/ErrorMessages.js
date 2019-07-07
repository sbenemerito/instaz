import React from 'react';

const ErrorMessages = ({ errors }) => errors && errors.length > 0 ? (
  <div className="ui error message">
    <i className="close icon"></i>
    <div className="header">
      There were some errors with your submission
              </div>
    <ul className="list">
      {
        errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })
      }
    </ul>
  </div>
) : null;

export default ErrorMessages;
