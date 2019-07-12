import React from 'react';
import { Formik, Form } from 'formik';

class CommentForm extends React.Component {
  render() {
    return(
      <div className="extra content">
        <Formik
          initialValues={{
            message: '',
            post: this.props.post.id,
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addComment(values).then(response => {
              resetForm();
              values.message = ''; // clear form
            });
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange }) => (
            <Form className={isSubmitting ? "ui loading form" : "ui form"}>
              <div className="ui large transparent left icon input">
                <i className="comment outline icon"></i>
                <input type="text" name="message" maxLength="400" placeholder="Add Comment..." onChange={handleChange} value={values.message} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CommentForm;