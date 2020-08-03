import React from "react";
import { List, Space, Descriptions, Divider } from "antd";
import { SmileOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class ClassListComponents extends React.Component {
  render() {
    console.log(this.props.data)
    return (
      <React.Fragment>
        {this.props.is_student ? <React.Fragment>
          <Divider orientation="left">My ClassRoom</Divider>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3
            }}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item
                key={item.pk}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={item.stars === undefined ? 0 : item.stars}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={SmileOutlined}
                    text="7"
                    key="list-vertical-like-o"
                  />
                ]}
              >
                <Descriptions bordered>
                  <Descriptions.Item label="Name">
                    {this.props.userId === item.pk ? <React.Fragment> {item.user.toUpperCase()} (Me) </React.Fragment> : <Link to={`/profile/${item.pk}`}>
                      {item.user.toUpperCase()}
                    </Link>}
                  </Descriptions.Item>
                  <Descriptions.Item label="Roll Number">
                    {item.roll_number}
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            )}
          />
        </React.Fragment> : <React.Fragment>

            <Divider orientation="left">My Students</Divider>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3
              }}
              dataSource={this.props.data}
              renderItem={item => (
                <List.Item
                  key={item.pk}
                >
                  <Descriptions bordered>
                    <Descriptions.Item label="Name">
                      <Link to={`/profile/${item.pk}`}>
                        {item.user.toUpperCase()}
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Roll Number">
                      {item.roll_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Section">
                      {item.section}
                    </Descriptions.Item>
                    <Descriptions.Item label="Class/Grade">
                      {item.grade}
                    </Descriptions.Item>
                  </Descriptions>
                </List.Item>
              )}
            />
          </React.Fragment>}

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    is_student: state.is_student,
    is_teacher: state.is_teacher,
    is_headmaster: state.is_headmaster
  };
};

export default connect(mapStateToProps, null)(ClassListComponents);
