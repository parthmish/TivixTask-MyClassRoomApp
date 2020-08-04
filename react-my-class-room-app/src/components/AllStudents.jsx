import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

class AllStudents extends React.Component {
    state = { data: [] };

    componentDidMount() {
        const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }

        axios.get(`http://localhost:8000/api/home/students/`, tHeaders)
            .then(res => {
                this.setState({ data: res.data });
            });
    }

    render() {
        return (
            <Menu
                mode="inline"
                style={{
                    background: "#fff9e6",
                    height: "250px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}
                defaultOpenKeys={["allStudents"]}
            >
                <SubMenu key="allStudents" icon={<UserOutlined />} title="All Students">
                    {this.state.data.map(data => (
                        <Menu.Item key={data.pk}>
                            <a href={`/profile/${data.pk}`}>{data.user}</a>
                        </Menu.Item>
                    ))}
                </SubMenu>
            </Menu>
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

export default connect(mapStateToProps, null)(AllStudents);