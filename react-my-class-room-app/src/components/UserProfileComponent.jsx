import React, { Component } from "react";
import { Descriptions, Avatar, Divider, Button, Switch, Col, Row } from "antd";
import { connect } from "react-redux";


class UserProfileComponent extends Component {
  render() {
    return (
      <React.Fragment >
        {Object.keys(this.props.modelStudentInfo).length !== 0 ?
          <React.Fragment>
            <Divider orientation="left">{this.props.modelStudentInfo.user}'s Profile</Divider>
            <Descriptions size="small" bordered>
              <Descriptions.Item label="User">{this.props.modelStudentInfo.user}</Descriptions.Item>
              <Descriptions.Item label="Class/Grade">
                {this.props.modelStudentInfo.grade}
              </Descriptions.Item>
              <Descriptions.Item label="Section">
                {this.props.modelStudentInfo.section}
              </Descriptions.Item>
              <Descriptions.Item label="Roll Number">
                {this.props.modelStudentInfo.roll_number}
              </Descriptions.Item>
            </Descriptions>
          </React.Fragment>
          :
          <React.Fragment>
            <Divider orientation="left">{this.props.modelTeacherInfo.user}'s Profile</Divider>
            <Descriptions
              dataSource={this.props.modelTeacherInfo}
              bordered
              size="small"
            >
              <Descriptions.Item label="Subjects Teaching">
                {this.props.modelTeacherInfo.subject}
              </Descriptions.Item>
            </Descriptions>
          </React.Fragment>}


        <Descriptions size="small" bordered>
          <Descriptions.Item label="Profile Picture">
            <Avatar
              size={80}
              shape="square"
              src={this.props.userInfo.profile_image}
            ></Avatar>
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {this.props.userInfo.user}
          </Descriptions.Item>
          <Descriptions.Item label="Birth-Date">
            {this.props.userInfo.birth_date}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {this.props.userInfo.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile Number">
            {this.props.userInfo.phone_number}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Actions</Divider>
        <Row>
          <Col className="gutter-row" span={6}>
            <Button type="primary">Request Friendship</Button>
          </Col>
          {this.props.is_student ? null
            : <React.Fragment> <Col className="gutter-row" span={6}>
              Starred Student: <Switch size="large" />
            </Col>
              <Col className="gutter-row" span={6}>
                <Button type="danger">Deactivate Student</Button>
              </Col></React.Fragment>
          }
        </Row>
      </React.Fragment >
    );
  }

};


const mapStateToProps = state => {
  return {
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(UserProfileComponent);