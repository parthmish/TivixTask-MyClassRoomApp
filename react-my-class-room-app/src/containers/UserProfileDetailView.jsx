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
      })
      .catch(err => {
        console.log(err)
      });
    axios
      .get(`http://localhost:8000/api/home/students/${profileID}/`, tHeaders)
      .then(res => {
        this.setState({
          modelStudentProfileDetailComponent: res.data
        });
      })
      .catch(err => {
        console.log(err)
      });
    if (this.props.is_teacher === false) {
      axios
        .get(
          `http://localhost:8000/api/home/teachers/${profileID}/`, tHeaders)
        .then(res => {
          this.setState({
            modelTeacherProfileDetailComponent: res.data
          });
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
  //   const profileID = this.props.match.params.profileID;
  //   console.log(prevState, this.state)
  //   axios
  //     .get(
  //       `http://localhost:8000/api/accounts/profiles/${profileID}/`, tHeaders)
  //     .then(res => {
  //       if (prevState.userProfileComponent !== this.state.userProfileComponent) {
  //         this.setState({
  //           userProfileComponent: res.data
  //         });
  //       }
  //     });
  //   axios
  //     .get(`http://localhost:8000/api/home/students/${profileID}/`, tHeaders)
  //     .then(res => {
  //       if (prevState.modelStudentProfileDetailComponent !== this.state.modelStudentProfileDetailComponent) {
  //         this.setState({
  //           modelStudentProfileDetailComponent: res.data
  //         });
  //       }
  //     });
  //   if (this.props.is_teacher === false) {
  //     axios
  //       .get(
  //         `http://localhost:8000/api/home/teachers/${profileID}/`, tHeaders)
  //       .then(res => {
  //         if (prevState.modelTeacherProfileDetailComponent !== this.state.modelTeacherProfileDetailComponent) {
  //           this.setState({
  //             modelTeacherProfileDetailComponent: res.data
  //           });
  //         }
  //       });
  //   }
  // }

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