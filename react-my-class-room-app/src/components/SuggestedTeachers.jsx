import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'

const { SubMenu } = Menu;

class SuggestedTeachers extends React.Component {
  state = { data: [] };

  componentDidMount() {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
    axios.get(`http://localhost:8000/api/home/suggestedteachers/${this.props.userId}`, tHeaders)
      .then(res => {
        this.setState({ data: res.data });
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
        defaultOpenKeys={["suggestedTeachers"]}
      >
        <SubMenu
          key="suggestedTeachers"
          icon={<UserAddOutlined />}
          title="Suggested Teachers"
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
    token: state.token,
    userId: state.userId,
  };
};

export default connect(mapStateToProps, null)(SuggestedTeachers);
