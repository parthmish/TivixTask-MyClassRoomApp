import React from "react";
import { Route } from "react-router-dom";
import ClassList from "./containers/ClassListView";
import MyProfile from "./containers/MyProfileView";
import UserProfileDetail from "./containers/UserProfileDetailView";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
const BaseRouter = (props) => {
  return (
    <div>
      {props.isAuthenticated ? <React.Fragment>  <Route exact path="/class" component={ClassList} />
        <Route exact path="/profile" component={MyProfile} />
        <Route exact path="/profile/:profileID" component={UserProfileDetail} /> </React.Fragment> :
        <React.Fragment>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </React.Fragment>
      }
    </div>
  );
};

export default BaseRouter;
