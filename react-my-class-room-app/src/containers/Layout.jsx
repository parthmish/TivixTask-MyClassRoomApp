import React, { Component } from "react";
import { Layout, Menu, PageHeader } from "antd";
import logo from "./logo.svg";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";

import {
  UserOutlined,
  StarOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
  SmileOutlined,
  UserAddOutlined,
  PlusOutlined,
  LoginOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends Component {
  render() {
    return (
      <Layout>
        <Header
          className="header"
          style={{
            padding: "0 50px",
            textAlign: "center",
            background: "#4871b8",
            fontSize: "medium",
            color: "white"
          }}
        >
          <img src={logo} width="40" height="40" alt="logo" />{" "}
          &nbsp;&#9734;&nbsp;
          <strong>MyClassRoomApp By Parth</strong>
        </Header>
        <Content style={{ padding: "0 60px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 24px" }}
          >
            <Content
              style={{
                background: "#fafffe",
                padding: "24px  24px",
                height: "100%",
                minHeight: 500
              }}
            >
              {this.props.isAuthenticated ? (
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item key="class" icon={<TeamOutlined />}>
                      <Link to="/class/">Class</Link>
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<SettingOutlined />}>
                      <Link to="/profile/">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="invitations" icon={<PlusOutlined />}>
                      <Link to="/invitations/">Invitations</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={this.props.logout}
                      icon={<LogoutOutlined />}
                    >
                      <Link to="/login/">Logout</Link>
                    </Menu.Item>
                  </Menu>
                  <br />
                  {this.props.children}
                </div>
              ) : (
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item key="login" icon={<LoginOutlined />}>
                      <Link to="/login/">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="signup" icon={<UserAddOutlined />}>
                      <Link to="/signup/">Student SignUp</Link>
                    </Menu.Item>
                  </Menu>
                  <br />
                  {this.props.children}
                </div>
              )}
            </Content>
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <Sider className="site-layout-background" width={250}>
                  <Menu
                    mode="inline"
                    // defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ background: "#fff9e6", height: "100%" }}
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
                    <SubMenu
                      key="sub12"
                      icon={<SmileOutlined />}
                      title="My Friends"
                    >
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Sider className="site-layout-background" width={250}>
                  <Menu
                    mode="inline"
                    // defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ background: "#defff0", height: "100%" }}
                  >
                    <SubMenu
                      key="sub1"
                      icon={<UserOutlined />}
                      title="My Teachers"
                    >
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      icon={<UserAddOutlined />}
                      title="Suggested Teachers"
                    >
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
              </React.Fragment>
            ) : null}
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "20px 20px",
            position: "relative",
            textAlign: "center",
            width: "100%",
            bottom: "0"
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
    username: state.username,
    userId: state.userId,
    is_student: state.is_student,
    is_teacher: state.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
