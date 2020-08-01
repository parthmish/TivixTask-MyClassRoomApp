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
    axios
      .get(`http://localhost:8000/api/accounts/profiles/${this.props.userId}/`)
      .then(res => {
        this.setState({
          dataDetailComponent: res.data
        });
        console.log(res.data);
      });
  }

  render() {
    return <MyProfileDetailComponent data={this.state.dataDetailComponent} />;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
    username: state.username,
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyProfile)
);
