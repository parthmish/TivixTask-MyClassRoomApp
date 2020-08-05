import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NormalLoginForm = props => {
  const onFinish = values => {
    props.onAuth(values.username, values.password);
    props.history.push("/class")
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
        <div>
          &nbsp; Or <Link to="/signup/">SignUp!</Link>
        </div>
      </Form.Item>
      <div>
        <h3>Wecome to MyClassRoomApp</h3>
        <p>This app supports multiple user profiles (Headmaster, Teacher Student), following credentials will be useful:<br />
          <strong>Note:</strong> Password is same for all the users.<br />
          **Password: class@123<br />
          **STUDENT usernames: harry, jonas, tom<br />
          **TEACHER usernames: rick, hana, snape<br />
          **HEADMASTER username: dumbledore<br />
          **Admin <a href="http://localhost:8000/admin/">Panel</a> : parthmish<br />
          <i>Feel free to <Link to="/signup/">SignUp!</Link> and create new student profile..</i>
        </p>
      </div>
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
