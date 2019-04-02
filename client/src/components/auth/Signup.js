import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import * as actions from "../../actions";

import formFields from "../../config/authFormFields";
import FormField from "./FormField";

class Signup extends Component {
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
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderFields()}
        <div>{this.props.errorMessage}</div>
        <button>Sign up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(Signup);
