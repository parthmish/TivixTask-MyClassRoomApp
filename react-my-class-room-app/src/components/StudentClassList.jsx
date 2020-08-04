import React from "react";
import { List, Space, Descriptions, Divider } from "antd";
import { SmileOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const StudentClassList = (props) => {
    return (
        <React.Fragment>
            <Divider orientation="left">My ClassRoom</Divider>
            <List
                itemLayout="vertical"
                size="small"
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
                                {props.userId === item.pk ? <React.Fragment> {item.user.toUpperCase()} (Me) </React.Fragment> : <Link to={`/profile/${item.pk}`}>
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
        </React.Fragment >
    )
}

export default StudentClassList;