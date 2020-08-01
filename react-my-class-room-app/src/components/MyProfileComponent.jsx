import React from "react";
import { Descriptions, Avatar } from "antd";

const MyProfileDetailComponent = props => {
  return (
    <Descriptions dataSource={props.data} title="My Profile" bordered>
      <Descriptions.Item label="Profile Picture">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
      </Descriptions.Item>

      <Descriptions.Item label="User">{props.data.user}</Descriptions.Item>
      <Descriptions.Item label="Section">
        {props.data.section}
      </Descriptions.Item>
      <Descriptions.Item label="Roll Number">
        {props.data.roll_number}
      </Descriptions.Item>
      <Descriptions.Item label="Teacher">
        {props.data.teacher_obj}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MyProfileDetailComponent;
