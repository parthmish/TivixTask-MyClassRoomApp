//Component used to display all students in school.

import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const { SubMenu } = Menu;

class AllStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
        axios.get(`http://localhost:8000/api/home/students/`, tHeaders)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <Menu
                mode="inline"
                style={{
                    background: "#defff0",
                    height: "250px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}
                defaultOpenKeys={["allStudents"]}
            >
                <SubMenu key="allStudents" icon={<UserOutlined />} title="School Students">
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
    };
};

export default connect(mapStateToProps, null)(AllStudents);