import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class MyFriends extends React.Component {
  state = { data: [] };

  componentDidMount() {
    axios.get(`http://localhost:8000/api/home/students/`).then(res => {
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
        defaultOpenKeys={["myFriends"]}
      >
        <SubMenu key="myFriends" icon={<SmileOutlined />} title="Friends">
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

export default MyFriends;
