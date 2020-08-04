import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

class StarredStudents extends React.Component {
  state = { data: [] };

  componentDidMount() {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }

    if (this.props.is_student) {
      axios.get(`http://localhost:8000/api/home/starredstudents/studentprofile/${this.props.userId}`, tHeaders).then(res => {
        this.setState({ data: res.data });
      });
    }
    if (this.props.is_teacher) {
      axios.get(`http://localhost:8000/api/home/starredstudents/teacherprofile/${this.props.userId}`, tHeaders).then(res => {
        this.setState({ data: res.data });
      });
    }
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
        defaultOpenKeys={["starredStudent"]}
      >
        <SubMenu
          key="starredStudent"
          icon={<StarOutlined />}
          title="Starred Students"
        >
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
    loading: state.loading,
    error: state.error,
    userId: state.userId,
    token: state.token,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(StarredStudents);