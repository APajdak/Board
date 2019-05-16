import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import * as actions from "../../actions";

import formFields from "../../config/authFormFields";
import FormField from "./FormField";

class Signup extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push("/me");
    }
  }

  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push("/");
    });
  };

  renderFields() {
    return formFields.map(({ label, name, type }, index) => {
      return (
        <Field
          key={index}
          component={FormField}
          label={label}
          name={name}
          type={type}
          autoComplete="none"
        />
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        className="container"
        style={{ width: "40%" }}
      >
        {this.renderFields()}
        <div className="text-danger">{this.props.errorMessage}</div>
        <button className="btn btn-secondary btn-lg btn-block">Sign up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    authenticated: state.auth.authenticated
  };
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2 || values.name.length > 50) {
    errors.name = "User name must be between 2 and 50 characters";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 4) {
    errors.password = "Password must have at least 4 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords does not match";
  }
  return errors;
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ validate, form: "signup" })
)(Signup);
