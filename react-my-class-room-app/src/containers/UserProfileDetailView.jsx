import React from "react";
import axios from "axios";
import UserProfileComponent from "../components/UserProfileComponent";

class UserProfileDetail extends React.Component {
  state = {
    modelStudentProfileDetailComponent: {},
    userProfileComponent: {},
    modelTeacherProfileDetailComponent: {}

  };

  componentDidMount() {
    const profileID = this.props.match.params.profileID;
    axios
      .get(`http://localhost:8000/api/home/students/${profileID}/`)
      .then(res => {
        this.setState({
          modelStudentProfileDetailComponent: res.data
        });
      });
    axios
      .get(
        `http://localhost:8000/api/accounts/profiles/${profileID}/`
      )
      .then(res => {
        this.setState({
          userProfileComponent: res.data
        });
      });
    axios
      .get(
        `http://localhost:8000/api/home/teachers/${profileID}/`
      )
      .then(res => {
        this.setState({
          modelTeacherProfileDetailComponent: res.data
        });
      });
  }

  render() {
    console.log(this.state)
    return <UserProfileComponent modelStudentInfo={this.state.modelStudentProfileDetailComponent}
      userInfo={this.state.userProfileComponent} modelTeacherInfo={this.state.modelTeacherProfileDetailComponent} />;
  }
}

export default UserProfileDetail;
