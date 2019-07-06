import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

class Signup extends React.Component {
  render() {
    return (
      <div className="Signup">
        <div className="ui container segment">
          <h2 className="ui center aligned header">
            <div className="content">
              Signup
              <div className="sub header">Already have an account? Use it to <Link to="/login">login</Link>!</div>
            </div>
          </h2>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form className="ui form">
                <div className="required field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={values.username} />
                    <i className="user icon"></i>
                  </div>
                  <ErrorMessage className="error" name="username" component="div" />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <div className="ui left icon input">
                    <input type="email" name="email" placeholder="Email address" onChange={handleChange} value={values.email} />
                    <i className="envelope outline icon"></i>
                  </div>
                  <ErrorMessage className="error" name="email" component="div" />
                </div>
                <div className="required field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={values.password} />
                    <i className="lock icon"></i>
                  </div>
                  <ErrorMessage className="error" name="password" component="div" />
                </div>
                <div className="required field">
                  <label>Password Confirmation</label>
                  <div className="ui left icon input">
                    <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={handleChange} value={values.passwordConfirmation} />
                    <i className="lock icon"></i>
                  </div>
                  <ErrorMessage className="error" name="passwordConfirmation" component="div" />
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

export default Signup;
