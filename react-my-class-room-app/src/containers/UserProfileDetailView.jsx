import React from "react";
import axios from "axios";
import UserProfileComponent from "../components/UserProfileComponent";
import { connect } from "react-redux";

class UserProfileDetail extends React.Component {
  state = {
    modelStudentProfileDetailComponent: {},
    userProfileComponent: {},
    modelTeacherProfileDetailComponent: {}
  };

  componentDidMount() {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
    const profileID = this.props.match.params.profileID;
    axios
      .get(
        `http://localhost:8000/api/accounts/profiles/${profileID}/`, tHeaders)
      .then(res => {
        this.setState({
          userProfileComponent: res.data
        });
      });
    axios
      .get(`http://localhost:8000/api/home/students/${profileID}/`, tHeaders)
      .then(res => {
        this.setState({
          modelStudentProfileDetailComponent: res.data
        });
      });
    if (this.props.is_teacher === false) {
      axios
        .get(
          `http://localhost:8000/api/home/teachers/${profileID}/`, tHeaders)
        .then(res => {
          this.setState({
            modelTeacherProfileDetailComponent: res.data
          });
        });
    }
  }

  render() {
    return <UserProfileComponent modelStudentInfo={this.state.modelStudentProfileDetailComponent}
      userInfo={this.state.userProfileComponent} modelTeacherInfo={this.state.modelTeacherProfileDetailComponent} profileID />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(UserProfileDetail);