import React from "react";
import ClassListComponents from "../components/ClassListComponents";
import axios from "axios";
import { connect } from "react-redux";

class ClassList extends React.Component {
  constructor() {
    super();
    this.state = {
      classComponent: [],
      stars: [],
      friends: []
    };
  }

  componentDidMount() {
    const tHeaders = { headers: { "Authorization": `Token ${this.props.token}` } }
    if (this.props.is_student) {
      axios.get(`http://localhost:8000/api/home/classroom/${this.props.userId}`, tHeaders).then(res => {
        this.setState({
          classComponent: res.data
        });
      });
      axios.get(`http://localhost:8000/api/home/getstars/${this.props.userId}`, tHeaders).then(res => {
        this.setState({
          stars: res.data
        });
      });
      axios.get(`http://localhost:8000/api/home/getfriends/${this.props.userId}`, tHeaders).then(res => {
        this.setState({
          starfriends: res.data
        });
      });
    }
    if (this.props.is_teacher) {
      axios.get(`http://localhost:8000/api/home/mystudents/${this.props.userId}`, tHeaders).then(res => {
        this.setState({
          classComponent: res.data
        });
      });
    }
  }

  render() {
    var classComponentStars = (this.state.classComponent).map(x => Object.assign(x, (this.state.stars).find(y => y.pk === x.pk)));
    console.log(classComponentStars)
    return <ClassListComponents data={classComponentStars} />
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
    userId: state.userId,
    token: state.token,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(ClassList);
