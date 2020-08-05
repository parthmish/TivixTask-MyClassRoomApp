import React from "react";
import { Divider, Button, } from "antd";
import {
    Form,
    Input,
    Select,
    InputNumber,
    message,
} from 'antd';
import { connect } from "react-redux";
import axios from "axios";

class EditStudentProfileForm extends React.Component {

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
            .get(`http://localhost:8000/api/home/students/${profileID}/`, tHeaders)
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
                .post(
                    `http://localhost:8000/api/home/students/${this.state.studentProfileComponent.pk}/`, data, tHeaders)
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
                    <Form.Item label="Grade" name="grade" >
                        <Select defaultValue={this.state.studentProfileComponent.grade}>
                            <Select.Option value="1st grade">1st grade</Select.Option>
                            <Select.Option value="2nd grade">2nd grade</Select.Option>
                            <Select.Option value="3rd grade">3rd grade</Select.Option>
                            <Select.Option value="4th grade">4th grade</Select.Option>
                            <Select.Option value="5th grade">5th grade</Select.Option>
                            <Select.Option value="6th grade">6th grade</Select.Option>
                            <Select.Option value="7th grade">7th grade</Select.Option>
                            <Select.Option value="8th grade">8th grade</Select.Option>
                            <Select.Option value="9th grade">9th grade</Select.Option>
                            <Select.Option value="10th grade">10th grade</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Section" name="section" >
                        <Select defaultValue={this.state.studentProfileComponent.section}>
                            <Select.Option value="A">A</Select.Option>
                            <Select.Option value="B">B</Select.Option>
                            <Select.Option value="C">C</Select.Option>
                            <Select.Option value="D">D</Select.Option>
                            <Select.Option value="E">E</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Roll Number" name="roll_number">
                        <InputNumber defaultValue={this.state.studentProfileComponent.roll_number} />
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

export default connect(mapStateToProps, null)(EditStudentProfileForm);
