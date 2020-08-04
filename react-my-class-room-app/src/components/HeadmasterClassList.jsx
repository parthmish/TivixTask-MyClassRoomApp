import React from "react";
import { Form, Input, Button, Divider } from "antd";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HeadmasterClassList = (props) => {
    const onFinish = values => {
        console.log("Received values of form: ", values);
        props.onAuth(
            values.username,
            values.email,
            values.password1,
            values.password2
        );
    };
    return (
        <React.Fragment>
            <Divider orientation="left">Create Teacher</Divider>

            <Form name="register" onFinish={onFinish}>
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
                        Create Teacher
            </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, is_student = false) =>
            dispatch(actions.authSignUp(username, email, password1, password2, is_student))
    };
};

export default connect(null, mapDispatchToProps)(HeadmasterClassList);
