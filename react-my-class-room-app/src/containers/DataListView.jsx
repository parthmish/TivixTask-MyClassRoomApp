import React from "react";
import DataComponents from "../components/DataListComponents";
import axios from "axios";

class DataList extends React.Component {
  state = {
    dataComponent: []
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/home/students/").then(res => {
      this.setState({
        dataComponent: res.data
      });
      console.log(res.data);
    });
  }

  render() {
    return <DataComponents data={this.state.dataComponent} />;
  }
}

export default DataList;
