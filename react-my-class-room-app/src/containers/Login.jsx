import React from "react";
import { Form, Input, Button, PageHeader } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NormalLoginForm = props => {
  const onFinish = values => {
    // console.log("Received values of form: ", values);
    props.onAuth(values.username, values.password);
    props.history.push("/class");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup/">SignUp!</Link>
      </Form.Item>
      <PageHeader
        className="site-page-header"
        subTitle="Newly Registered Students: Please update your profile for faster account approval from Teachers."
      />
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
