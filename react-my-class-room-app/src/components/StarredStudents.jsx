import React from "react";
import axios from "axios";
import { Menu } from "antd";
import { StarOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class StarredStudents extends React.Component {
  state = { data: [] };

  componentDidMount() {
    // const dataID = this.props.match.params.dataID;
    axios.get(`http://localhost:8000/api/home/students/`).then(res => {
      this.setState({ data: res.data });
      console.log(res.data);
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

export default StarredStudents;
