import React, { Component } from "react";
import { Descriptions, Avatar, Divider, Button, Switch, Col, Row } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: {}
    }
  }

  componentDidMount() {
    if (this.props.is_teacher) {
      this.setState({
        actions: { "studentTeacherRelationShip": false, "studentStarred": false }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }

    if (this.props.is_teacher) {
      if (prevProps.modelStudentInfo.pk !== this.props.modelStudentInfo.pk) {
        axios
          .get(`http://localhost:8000/api/home/student-state-wrt-teacher/${this.props.modelStudentInfo.pk}/${this.props.userId}/`, tHeaders)
          .then(res => {
            if ((prevState.actions !== this.state.actions) || (prevProps.modelStudentInfo.pk !== this.props.modelStudentInfo.pk)) {
              this.setState({
                actions: res.data
              });
            }
          });
      }
      if (prevState.actions !== this.state.actions) {
        console.log(this.state.actions)
      }
    }
  }

  handleStarChange() {
    console.log("change")
  }
  handleStudentChange() {
    this.setState({
      studentTeacherRelationShip: "false"
    })
    console.log("change")
  }
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
              Starred Student: <Switch size="large" checked={this.state.actions.studentStarred} checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />} onChange={this.handleStarChange} />
            </Col>
              <Col className="gutter-row" span={6}>
                Teaching Student? : <Switch size="large" checked={this.state.actions.studentTeacherRelationShip} checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />} onChange={this.handleStudentChange} />
              </Col>

            </React.Fragment>
          }
        </Row>
      </React.Fragment >
    );
  }

};


const mapStateToProps = state => {
  return {
    userId: state.userId,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster,
    token: state.token,
  };
};

export default connect(mapStateToProps, null)(UserProfileComponent);