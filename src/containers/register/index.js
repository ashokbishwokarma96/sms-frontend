import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Header,
  Segment,
  Input,
  Label,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { push } from "react-router-redux";

import { registerUser } from "./../../actions/AuthActions";

function validate(values) {
  var errors = {};
  const { email, password, name, roles } = values;
  if (!name || name.trim() === "") {
    errors.name = "Password is Required";
  }
  if (!email || email.trim() === "") {
    errors.email = "Email is Required";
  }
  if (!password || password.trim() === "") {
    errors.password = "Password is Required";
  }
  if (!roles || roles.trim() === "") {
    errors.roles = "Password is Required";
  }
  return errors;
}

class Register extends Component {
  componentWillMount() {
    // const { token } = this.props.auth;
    // const { dispatch } = this.props;
    // if (token) {
    //   dispatch(push("/inventory"));
    // }
  }
  renderField({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;
    return (
      <div>
        <Input
          type="text"
          autoFill="off"
          error={hasError}
          fluid
          {...input}
          {...custom}
        />
        {hasError && (
          <Label basic color="red" pointing>
            {error}
          </Label>
        )}
      </div>
    );
  }
  onSubmit(values, dispatch) {
    console.log("data ", values);
    return dispatch(registerUser(values)).then(function (data) {
      dispatch(push("/login"));
    });
  }
  render() {
    const { handleSubmit, pristine, initialValues, errors, submitting } =
      this.props;
    const { token, user, isLoggingIn, loggingInError } = this.props.auth;
    let error = null;
    if (loggingInError) {
      error = (
        <Message negative>
          <Message.Header>Error while Register</Message.Header>
          <p>{loggingInError}</p>
        </Message>
      );
    }
    return (
      <Segment
        textAlign="center"
        style={{
          position: "absolute",
          height: "425px",
          width: "400px",
          top: "35%",
          left: "50%",
          margin: "-100px 0 0 -150px",
          border: "none",
          background: "lavender",
          fontFamily: "system-ui",
          color: "#282829",
        }}
      >
        <h1>Stock Management System</h1>

        <Segment style={{ background: "aliceblue" }}>
          <Header as="h2">Register</Header>
          {error}
          <Form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            loading={isLoggingIn}
            autoFill="off"
          >
            <Form.Field inline>
              <Field
                name="name"
                placeholder="Full Name"
                component={this.renderField}
              ></Field>
            </Form.Field>
            <Form.Field inline autoFill="off">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                component={this.renderField}
                autoFill="off"
              ></Field>
            </Form.Field>
            <Form.Field inline>
              <Field
                name="password"
                type="password"
                placeholder="Choose Password"
                component={this.renderField}
                autoComplete="off"
              ></Field>
            </Form.Field>
            <Form.Field>
              <Field name="roles" type="roles" component="select">
                <option value="storeManager">Store Manager</option>
                <option value="deliveryManager">Delivery Manager</option>
              </Field>
            </Form.Field>

            <Button loading={submitting} disabled={submitting}>
              Register
            </Button>
          </Form>
          <a href="#/login">Have a account? Login me</a>
        </Segment>
      </Segment>
    );
  }
}

function mapStatesToProps(state) {
  return {
    auth: state.auth,
  };
}

export default reduxForm({
  form: "Register",
  validate,
})(connect(mapStatesToProps)(Register));
