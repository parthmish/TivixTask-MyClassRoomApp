import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class MyTeachers extends React.Component {
  state = { data: [] };

  componentDidMount() {
    // const dataID = this.props.match.params.dataID;
    axios.get(`http://localhost:8000/api/home/teachers/`).then(res => {
      this.setState({ data: res.data });
      // console.log(res.data);
    });
  }

  render() {
    return (
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        style={{
          background: "#defff0",
          height: "250px",
          overflowY: "scroll",
          overflowX: "hidden"
        }}
        defaultOpenKeys={["myTeachers"]}
      >
        <SubMenu key="myTeachers" icon={<UserOutlined />} title="My Teachers">
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

export default MyTeachers;
