import React from "react";
import { Divider, Button, } from "antd";
import {
    Form,
    Input,
    message,
} from 'antd';
import { connect } from "react-redux";
import axios from "axios";

class EditTeacherProfileForm extends React.Component {

    constructor() {
        super();
        this.state = {
            studentProfileComponent: [],
        };
    }

    componentDidMount() {
        const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
        const profileID = this.props.match.params.profileID;
        axios
            .get(`http://localhost:8000/api/home/teachers/${profileID}/`, tHeaders)
            .then(res => {
                console.log(res.data);
                this.setState({
                    studentProfileComponent: res.data,
                });
            });
    }

    warn = () => {
        message.warn("Add new changes")
    }

    onFinish = values => {
        var data = {}
        console.log(this.state.studentProfileComponent)
        for (var [key, value] of Object.entries(values)) {
            if (value === undefined) {
                value = this.state.studentProfileComponent[key]
            }
            data[key] = value
        }
        console.log(data)

        if (JSON.stringify(this.state.studentProfileComponent) !== JSON.stringify(data)) {
            const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
            axios
                .put(
                    `http://localhost:8000/api/home/teachers/${this.state.studentProfileComponent.pk}/`, data, tHeaders)
                .then(res => {
                    console.log(res.data);
                });
        }
        if (JSON.stringify(this.state.studentProfileComponent) === JSON.stringify(data)) {
            this.warn()
        }
    };
    render() {
        return (
            <React.Fragment>
                <Divider orientation="left">Edit Student Profile</Divider>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={{ remember: false }}
                    key={this.state.studentProfileComponent.pk}
                >

                    <Form.Item label="pk" name="pk" hidden>
                        <Input defaultValue={this.state.studentProfileComponent.pk} disabled />
                    </Form.Item>
                    <Form.Item label="User" name="user">
                        <Input defaultValue={this.state.studentProfileComponent.user} disabled />
                    </Form.Item>
                    <Form.Item label="Subject" name="subject">
                        <Input defaultValue={this.state.studentProfileComponent.subject} />
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
        is_student: state.is_student,
        is_teacher: state.is_teacher,
        is_headmaster: state.is_headmaster
    };
};

export default connect(mapStateToProps, null)(EditTeacherProfileForm);
