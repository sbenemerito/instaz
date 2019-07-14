import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { loginUser } from '../actions';
import ErrorMessages from './ErrorMessages';

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const PostFormSchema = Yup.object().shape({
  image: Yup.mixed()
    .required('This field is required')
    .test(
      "fileSize",
      "File too large (should not be bigger than 5 MB)",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format (Only JPG, PNG, and GIFs are accepted)",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  caption: Yup.string()
    .max(200, 'Caption can only be up to 200 characters.')
});

class PostForm extends React.Component {
  render() {
    return (
      <div className="PostForm">
        <div className="ui container segment">
          <h2 className="ui center aligned header">
            <div className="content">
              Add Post
              <div className="sub header">Share a moment with everyone!</div>
            </div>
          </h2>
          <ErrorMessages errors={this.props.errorMessages} />
          <Formik
            initialValues={{
              image: null,
              caption: '',
            }}
            validationSchema={PostFormSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.props.loginUser(values).then(response => {
                setSubmitting(false);
              });
            }}
          >
            {({ values, errors, touched, isSubmitting, handleChange }) => (
              <Form className={isSubmitting ? "ui loading form" : "ui form"}>
                {/* TODO: HANDLE IMAGE UPLOAD */}
                <div className="required field">
                  <label>Image</label>
                  <div className="ui left icon input">
                    <input type="text" name="image" placeholder="Image" onChange={handleChange} value={values.image} />
                    <i className="user icon"></i>
                  </div>
                  <ErrorMessage className="error" name="image" component="div" />
                </div>
                <div className="required field">
                  <label>Caption</label>
                  <div className="ui left icon input">
                    <input type="caption" name="caption" placeholder="Caption" onChange={handleChange} value={values.caption} />
                    <i className="lock icon"></i>
                  </div>
                  <ErrorMessage className="error" name="caption" component="div" />
                </div>
                <button className="ui button" type="submit">Submit</button>
              </Form>
            )}
          </Formik>
          {
            this.props.currentUser ? null : <Redirect to="/login" />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorMessages, currentUser } = state;
  return { errorMessages, currentUser };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(PostForm);
