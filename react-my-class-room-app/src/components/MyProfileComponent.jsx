import React from "react";
import { Descriptions, Avatar, Divider } from "antd";
import { connect } from "react-redux";

class MyProfileDetailComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <div>
              <Divider orientation="left">My Profile</Divider>
              <Descriptions
                dataSource={this.props.profile}
                bordered
                size="small"
              >
                <Descriptions.Item label="Profile Picture">
                  <Avatar
                    size={80}
                    shape="square"
                    src={this.props.profile.profile_image}
                  ></Avatar>
                </Descriptions.Item>
                <Descriptions.Item label="Username">
                  {this.props.profile.user}
                </Descriptions.Item>
                <Descriptions.Item label="Birth-Date">
                  {this.props.profile.birth_date}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {this.props.profile.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile Number">
                  {this.props.profile.phone_number}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div>
              {this.props.is_student ? (
                <React.Fragment>
                  <Divider orientation="left">My ClassRoom Data</Divider>
                  <Descriptions
                    dataSource={this.props.profile}
                    bordered
                    size="small"
                  >
                    <Descriptions.Item label="Class/Grade">
                      {this.props.classRoomData.grade}
                    </Descriptions.Item>
                    <Descriptions.Item label="Section">
                      {this.props.classRoomData.section}
                    </Descriptions.Item>
                    <Descriptions.Item label="Roll Number">
                      {this.props.classRoomData.roll_number}
                    </Descriptions.Item>
                  </Descriptions>
                </React.Fragment>
              ) : null}
              {this.props.is_teacher ? (
                <React.Fragment>
                  <React.Fragment>
                    <Divider orientation="left">Teacher Data</Divider>
                    <Descriptions
                      dataSource={this.props.profile}
                      bordered
                      size="small"
                    >
                      <Descriptions.Item label="Subjects Teaching">
                        {this.props.teacherData.subject}
                      </Descriptions.Item>
                    </Descriptions>
                  </React.Fragment>
                </React.Fragment>
              ) : null}
              {this.props.is_headmaster ? (
                <Divider orientation="left">HeadMaster</Divider>
              ) : null}
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(MyProfileDetailComponent);
