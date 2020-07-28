import React from "react";
import { List, Avatar, Space } from "antd";
import {
  SmileOutlined,
  LikeOutlined,
  StarOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

// const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: "https://ant.design",
//     title: `ant design part ${i}`,
//     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
//     description:
//       "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//     content:
//       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
//   });
// }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const DataComponents = props => {
  return (
    <List
      header={<div>My ClassRoom Students</div>}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 4
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.pk}
          actions={[
            <IconText
              icon={StarOutlined}
              text="3"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={SmileOutlined}
              text="7"
              key="list-vertical-like-o"
            />
          ]}
          extra={
            <img
              width={75}
              alt="logo"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          }
        >
          <ArrowRightOutlined /> {item.user}, {item.section}, {item.roll_number}
          , {item.grade}, {item.teacher_obj}
        </List.Item>
      )}
    />
  );
};

export default DataComponents;
