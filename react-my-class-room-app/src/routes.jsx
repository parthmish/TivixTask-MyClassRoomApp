import React from "react";
import { Route } from "react-router-dom";
import DataList from "./containers/DataListView";
import DataDetail from "./containers/DataDetailView";

const BaseRouter = () => {
  return (
    <div>
      <Route exact path="/" component={DataList} />
      <Route exact path="/profile/:dataID" component={DataDetail} />
    </div>
  );
};

export default BaseRouter;
