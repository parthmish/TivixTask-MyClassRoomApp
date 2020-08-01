import React from "react";
import axios from "axios";
import MyProfileDetailComponent from "../components/MyProfileComponent";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MyProfile extends React.Component {
  state = {
    dataDetailComponent: {}
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      axios
        .get(
          `http://localhost:8000/api/accounts/profiles/${this.props.userId}/`
        )
        .then(res => {
          this.setState({
            dataDetailComponent: res.data
          });
          console.log(res.data);
        });
    }
  }

  render() {
    return <MyProfileDetailComponent data={this.state.dataDetailComponent} />;
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

export default withRouter(connect(mapStateToProps, null)(MyProfile));
