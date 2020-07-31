import React from "react";
import { Route } from "react-router-dom";
import DataList from "./containers/DataListView";
import DataDetail from "./containers/DataDetailView";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
const BaseRouter = () => {
  return (
    <div>
      <Route exact path="/class" component={DataList} />
      <Route exact path="/profile/:dataID" component={DataDetail} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
};

export default BaseRouter;
