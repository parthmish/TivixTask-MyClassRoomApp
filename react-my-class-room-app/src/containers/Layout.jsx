import React from "react";
import { Layout, Menu } from "antd";
import logo from "./logo.svg";

import {
  UserOutlined,
  StarOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const CustomLayout = props => {
  return (
    <Layout>
      <Header
        className="header"
        style={{ padding: "0 50px", background: "#4871b8" }}
      >
        <img src={logo} width="40" height="40" alt="logo" /> &nbsp;
        <strong>MyClassRoomApp By Parth</strong>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Content
            style={{ background: "#ebfffe", padding: "0 24px", minHeight: 500 }}
          >
            <Menu mode="horizontal">
              <Menu.Item key="class" icon={<TeamOutlined />}>
                Class
              </Menu.Item>
              <Menu.Item key="profile" icon={<SettingOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Menu>
            Content
            {props.children}
          </Content>
          <Sider className="site-layout-background" width={300}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ background: "#ffef9e", height: "100%" }}
            >
              <SubMenu
                key="sub1"
                icon={<StarOutlined />}
                title="Starred Students"
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Sider className="site-layout-background" width={300}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub2"]}
              style={{ height: "100%" }}
            >
              <SubMenu key="sub2" icon={<UserOutlined />} title="My Teachers">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
