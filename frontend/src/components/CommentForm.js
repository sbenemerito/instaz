import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';

class CommentForm extends React.Component {
  render() {
    return(
      <div className="extra content">
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values, 'values');
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange }) => (
            <Form className={isSubmitting ? "ui loading form" : "ui form"}>
              <div className="ui large transparent left icon input">
                <i className="comment outline icon"></i>
                <input type="text" name="message" maxLength="400" placeholder="Add Comment..." />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CommentForm;