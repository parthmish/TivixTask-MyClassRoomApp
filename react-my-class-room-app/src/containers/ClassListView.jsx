import React from "react";
import ClassListComponents from "../components/ClassListComponents";
import axios from "axios";
import { connect } from "react-redux";

class ClassList extends React.Component {
  constructor() {
    super();
    this.state = {
      classComponent: []
    };
  }

  componentDidMount() {
    if (this.props.is_student) {
      axios.get(`http://localhost:8000/api/home/classroom/${this.props.userId}`).then(res => {
        this.setState({
          classComponent: res.data
        });
      });
    }
    if (this.props.is_teacher) {
      axios.get(`http://localhost:8000/api/home/mystudents/${this.props.userId}`).then(res => {
        this.setState({
          classComponent: res.data
        });
      });
    }
  }

  render() {
    return <ClassListComponents data={this.state.classComponent} />;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
    userId: state.userId,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(ClassList);
