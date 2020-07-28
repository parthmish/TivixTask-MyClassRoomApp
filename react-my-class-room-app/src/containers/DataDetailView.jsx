import React from "react";
import axios from "axios";
import { Card } from "antd";
import DataDetailComponent from "../components/DataDetailComponent";

class DataDetail extends React.Component {
  state = {
    dataDetailComponent: {}
  };

  componentDidMount() {
    const dataID = this.props.match.params.dataID;
    axios.get(`http://localhost:8000/api/home/students/${dataID}`).then(res => {
      this.setState({
        dataDetailComponent: res.data
      });
      console.log(res.data);
    });
  }

  render() {
    return <DataDetailComponent data={this.state.dataDetailComponent} />;
  }
}

export default DataDetail;
