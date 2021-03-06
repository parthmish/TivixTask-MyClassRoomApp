import React from "react";
import axios from "axios";
import MyProfileDetailComponent from "../components/MyProfileComponent";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      profileComponent: [],
      studentModelProfileComponent: [],
      teacherModelProfileComponent: []
    };
  }

  componentDidMount() {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }

    if (this.props.token !== undefined && this.props.token !== null) {
      axios
        .get(
          `http://localhost:8000/api/accounts/profiles/${this.props.userId}/`, tHeaders)
        .then(res => {
          this.setState({
            profileComponent: res.data
          });
        })
        .catch(err => {
          console.log(err)
        });
    }
    if (
      this.props.token !== undefined &&
      this.props.token !== null &&
      this.props.is_student === true
    ) {
      axios
        .get(`http://localhost:8000/api/home/students/${this.props.userId}/`, tHeaders)
        .then(res => {
          this.setState({
            studentModelProfileComponent: res.data
          });
        })
        .catch(err => {
          console.log(err)
        });
    }
    if (
      this.props.token !== undefined &&
      this.props.token !== null &&
      this.props.is_teacher === true
    ) {
      axios
        .get(`http://localhost:8000/api/home/teachers/${this.props.userId}/`, tHeaders)
        .then(res => {
          this.setState({
            teacherModelProfileComponent: res.data
          });
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  render() {
    return (
      <MyProfileDetailComponent
        profile={this.state.profileComponent}
        classRoomData={this.state.studentModelProfileComponent}
        teacherData={this.state.teacherModelProfileComponent}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
    userId: state.userId,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default withRouter(connect(mapStateToProps, null)(MyProfile));
