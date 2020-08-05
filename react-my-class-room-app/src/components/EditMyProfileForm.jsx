import React from "react";
import { Divider, Button, } from "antd";
import moment from 'moment';
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    message,
} from 'antd';
import { connect } from "react-redux";
import axios from "axios";

const dateFormat = 'YYYY/MM/DD';

class EditMyProfileForm extends React.Component {

    constructor() {
        super();
        this.state = {
            profileComponent: [],
        };
    }

    componentDidMount() {
        const tHeaders = { headers: { "Authorization": `Token ${this.props.token}`, 'content-type': 'multipart/form-data' } }
        const profileID = this.props.match.params.profileID;
        axios
            .get(
                `http://localhost:8000/api/accounts/profiles/${profileID}/`, tHeaders)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    profileComponent: res.data,
                });
            });
    }

    // Extremely naive approach..wasted 2 hours on this already..using { useState } would require a lot of manipulations.
    pickedFile = null; // save the picked file in this
    handleChangeProfilePic = (event) => {
        event.preventDefault();
        this.pickedFile = event.target.files[0];
        console.log("uploaded")
    }

    warn = () => {
        message.warn("Add new changes")
    }

    onFinish = values => {
        var data = {}
        console.log(this.state.profileComponent)
        for (var [key, value] of Object.entries(values)) {
            if (value === undefined) {
                value = this.state.profileComponent[key]
                if (key === 'profile_image') {
                    if (this.pickedFile !== null) {
                        value = this.pickedFile
                    }
                }
            }
            data[key] = value
        }
        console.log(data)

        if (JSON.stringify(this.state.profileComponent) !== JSON.stringify(data)) {
            const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
            axios
                .put(
                    `http://localhost:8000/api/accounts/profiles/${this.state.profileComponent.pk}/`, data, tHeaders)
                .then(res => {
                    console.log(res.data);
                });
        }
        if (JSON.stringify(this.state.profileComponent) === JSON.stringify(data)) {
            this.warn()
        }
    };
    render() {
        return (
            <React.Fragment>
                <Divider orientation="left">Edit Profile</Divider>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={{ remember: false }}
                    key={this.state.profileComponent.pk}
                >

                    <Form.Item label="pk" name="pk" hidden>
                        <Input defaultValue={this.state.profileComponent.pk} disabled />
                    </Form.Item>
                    <Form.Item label="User" name="user">
                        <Input defaultValue={this.state.profileComponent.user} disabled />
                    </Form.Item>
                    <Form.Item label="Birth Date" name="birth_date">
                        <DatePicker defaultValue={moment(this.state.profileComponent.birth_date, dateFormat)} format={dateFormat} />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender" >
                        <Select defaultValue={this.state.profileComponent.gender}>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="others">Others</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="InputNumber" name="phone_number">
                        <InputNumber defaultValue={this.state.profileComponent.phone_number} />
                    </Form.Item>
                    <Form.Item label="Profile Pic" name="profile_image">
                        <input type="file" accept="image/png, image/jpeg" onChange={this.handleChangeProfilePic} /> Current: {this.state.profileComponent.profile_image}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps, null)(EditMyProfileForm);
