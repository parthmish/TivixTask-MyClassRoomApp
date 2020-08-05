import React, { Component } from "react";
import { Descriptions, Avatar, Divider, Button, Switch, Col, Row, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.originalState = {
      actions: { "studentTeacherRelationShip": false, "studentStarred": false }
    }
    this.state = {
      actions: { "studentTeacherRelationShip": false, "studentStarred": false }
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
              this.originalState.actions = this.state.actions
            }
          });
      }
      if (prevState.actions !== this.state.actions) {
        // console.log("DIDupdate", this.originalState.actions, this.state.actions)
      }
    }
  }


  handleStarChange = () => {
    if (this.state.actions.studentTeacherRelationShip === false) {
      this.setState({ actions: { "studentTeacherRelationShip": this.state.actions.studentTeacherRelationShip, "studentStarred": false } });
    }
    if (this.state.actions.studentTeacherRelationShip === true) {
      this.setState({ actions: { "studentTeacherRelationShip": this.state.actions.studentTeacherRelationShip, "studentStarred": !(this.state.actions.studentStarred) } });
    }
    // console.log("StarChanged", this.originalState.actions, this.state.actions)
  }

  handleStudentChange = () => {
    this.setState({
      actions: {
        "studentTeacherRelationShip": !(this.state.actions.studentTeacherRelationShip),
        "studentStarred": (!(this.state.actions.studentTeacherRelationShip) === false ? false : this.state.actions.studentStarred)
      }
    });
    // console.log("Student Change", this.originalState.actions, this.state.actions)
  }

  warn = () => {
    message.warn('No changes...(Hint: Give a Star to Motivate Students) :)');
  };
  error = () => {
    message.error('Something went wrong :( try again...');
  };
  success = () => {
    message.success('Your Student-Teacher State is Saved!!');
  };

  saveState = () => {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
    if (this.props.is_teacher) {
      // console.log("Save state", this.originalState.actions, this.state.actions)
      // Naive approach is used....value updated and page refreshed to get new chaged componenets rather updating parent component
      if (this.originalState.actions === this.state.actions) {
        this.warn()
      }
      if (this.originalState.actions !== this.state.actions) {
        if (this.state.actions.studentTeacherRelationShip === false) {
          console.log("delete")
          axios.delete((`http://localhost:8000/api/home/student-state-wrt-teacher/${this.props.modelStudentInfo.pk}/${this.props.userId}/`),
            tHeaders, this.state.actions)
            .then(res => {
              console.log(res.data)
            })
            .catch(error => { this.error() });
        }
        if (this.originalState.actions.studentTeacherRelationShip === false) {
          if (this.state.actions.studentTeacherRelationShip === true) {
            console.log("create new")
            axios.post((`http://localhost:8000/api/home/student-state-wrt-teacher/${this.props.modelStudentInfo.pk}/${this.props.userId}/`),
              this.state.actions, tHeaders)
              .then(res => {
                console.log(res.data)
                this.success()
              })
              .catch(error => { this.error() });
          }
        }
        if (this.originalState.actions.studentTeacherRelationShip === true) {
          if (this.state.actions.studentTeacherRelationShip === true) {
            console.log("put starred")
            axios.put((`http://localhost:8000/api/home/student-state-wrt-teacher/${this.props.modelStudentInfo.pk}/${this.props.userId}/`),
              this.state.actions, tHeaders)
              .then(res => {
                console.log(res.data)
              })
              .catch(error => { this.error() });
          }
        }
        window.location.reload(false)
      }
    }
  }

  raiseFriendship = () => {
    message.error("This feature is not avialable :(!!")
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

        {this.props.is_teacher ? <React.Fragment>
          <Divider orientation="left ">Actions</Divider>
          <div className="site-card-border-less-wrapper"><Row> <Col className="gutter-row" span={6}>
            Starred Student: <Switch size="large" checked={this.state.actions.studentStarred} checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />} onClick={this.handleStarChange} />
          </Col>
            <Col className="gutter-row" span={6}>
              Teaching Student? : <Switch size="large" checked={this.state.actions.studentTeacherRelationShip} checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />} onClick={this.handleStudentChange} />
            </Col>
            <Col className="gutter-row" span={6}>
              <Button onClick={this.saveState}>Confirm Changes</Button>
            </Col>
          </Row>
          </div>
        </React.Fragment>
          : null
        }
        <Divider orientation="left">Friendship</Divider>
        <Col className="gutter-row" span={6}>
          <Button type="primary" onClick={this.raiseFriendship}>Request Friendship</Button>
        </Col>
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