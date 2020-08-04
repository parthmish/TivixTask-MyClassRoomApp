import React from "react";
import { Form, Input, Button, PageHeader } from "antd";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RegistrationForm = props => {
  const onFinish = values => {
    console.log("Received values of form: ", values);
    props.onAuth(
      values.username,
      values.email,
      values.password1,
      values.password2
    );
    props.history.push("/login");
  };
  return (
    <Form name="register" onFinish={onFinish}>
      <PageHeader
        className="site-page-header"
        subTitle="Only Students Needs to Register"
      />
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password1"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Confirm Password"
        dependencies={["password1"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password1") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        Or <Link to="/login/">Login!</Link>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_student = true) =>
      dispatch(actions.authSignUp(username, email, password1, password2, is_student))
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
