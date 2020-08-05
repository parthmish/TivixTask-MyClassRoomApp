import React from "react";
import { connect } from "react-redux";
import StudentClassList from './StudentClassList';
import TeacherClassList from './TeacherClassList';
import HeadmasterClassList from './HeadmasterClassList';

class ClassListComponents extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.is_student ? <StudentClassList {...this.props} /> : null}
        {this.props.is_teacher ? <TeacherClassList {...this.props} /> : null}
        {this.props.is_headmaster ? <HeadmasterClassList {...this.props} /> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    token: state.token,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(ClassListComponents);
