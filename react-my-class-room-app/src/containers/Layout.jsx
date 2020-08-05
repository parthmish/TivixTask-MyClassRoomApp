import React, { Component } from "react";
import { Layout, Menu } from "antd";
import logo from "./logo.svg";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import StarredStudents from "../components/StarredStudents";
import MyFriends from "../components/MyFriends";
import MyTeachers from "../components/MyTeachers";
import SuggestedTeachers from "../components/SuggestedTeachers";
import AllStudents from "../components/AllStudents";
import {
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  PlusOutlined,
  LoginOutlined
} from "@ant-design/icons";

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
                background: "#fcfcf0",
                padding: "24px  24px",
                height: "100%",
                minHeight: 500
              }}
            >
              {this.props.isAuthenticated ? (
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item key="class" icon={<TeamOutlined />}>
                      <Link to="/class">Class</Link>
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<SettingOutlined />}>
                      <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="invitations" icon={<PlusOutlined />}>
                      <Link to="/invitations">Invitations</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={this.props.logout}
                      icon={<LogoutOutlined />}
                    >
                      <Link to="/login">Logout</Link>
                    </Menu.Item>
                  </Menu>
                  <br />
                  {this.props.children}
                </div>
              ) : (
                  <div>
                    <Menu mode="horizontal">
                      <Menu.Item key="login" icon={<LoginOutlined />}>
                        <Link to="/login">Login</Link>
                      </Menu.Item>
                      <Menu.Item key="signup" icon={<UserAddOutlined />}>
                        <Link to="/signup">Student SignUp</Link>
                      </Menu.Item>
                    </Menu>
                    <br />
                    {this.props.children}
                  </div>
                )}
            </Content>
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <Sider
                  style={{ background: "#fff9e6" }}
                  className="site-layout-background"
                  width={250}
                >
                  {this.props.is_student ? (
                    <React.Fragment>
                      <StarredStudents /> <MyFriends />
                    </React.Fragment>
                  ) : (
                      <React.Fragment>
                        <StarredStudents /><AllStudents />
                      </React.Fragment>
                    )}
                </Sider>
                <Sider
                  style={{ background: "#defff0" }}
                  className="site-layout-background"
                  width={250}
                >
                  {this.props.is_student ? (
                    <React.Fragment>
                      <MyTeachers /> <SuggestedTeachers />
                    </React.Fragment>
                  ) : (
                      <React.Fragment>
                        <MyFriends />
                      </React.Fragment>
                    )}
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
            width: "100%",
            bottom: "0"
          }}
        >
          Ant Design ©2018 Created by Ant UED - Modified by - Parth
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
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
