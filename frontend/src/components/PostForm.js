import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { addPost } from '../actions';
import ErrorMessages from './ErrorMessages';

const FILE_SIZE = 3 * 1024 * 1024;
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
      "File too large (should not be bigger than 3 MB)",
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

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
    rawFile: null,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file || nextProps.file === this.state.rawFile) { return; }

    this.setState({ loading: true, rawFile: nextProps.file }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div className="ui tiny header">
          Preview:
        </div>
        <img src={thumb} alt={file.name} className="ui centered bordered medium image"/>
      </div>
    );
  }
}

class PostForm extends React.Component {
  state = {
    createdPost: null
  };

  render() {
    if (this.props.currentUser === null) {
      return <Redirect to="/login" />;
    }

    if (this.state.createdPost !== null) {
      return <Redirect to={`/p/${this.state.createdPost.id}`} />;
    }

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
            onSubmit={(values, { setSubmitting, props }) => {
              this.props.addPost(values).then(response => {
                setSubmitting(false);
                this.setState({ createdPost: this.props.currentPost });
              });
            }}
          >
            {({ values, errors, touched, isSubmitting, handleChange, setFieldValue }) => (
              <Form className={isSubmitting ? "ui loading form" : "ui form"}>
                <div className="required field">
                  <label>Image</label>
                  <div className="ui left icon input">
                    <input
                      type="file"
                      name="image"
                      placeholder="Image"
                      onChange={(event) => { setFieldValue("image", event.currentTarget.files[0]); }}
                    />
                    <i className="file image icon"></i>
                  </div>
                  <ErrorMessage className="error" name="image" component="div" />
                </div>
                <Thumb file={values.image} />
                <div className="field">
                  <label>Caption</label>
                  <div className="ui left icon input">
                    <input type="caption" name="caption" placeholder="Caption" onChange={handleChange} value={values.caption} />
                    <i className="quote left icon"></i>
                  </div>
                  <ErrorMessage className="error" name="caption" component="div" />
                </div>
                <button className="ui button" type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorMessages, currentUser, currentPost } = state;
  return { errorMessages, currentUser, currentPost };
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
