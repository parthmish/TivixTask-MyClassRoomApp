import React from "react";
import { List, Space, Descriptions, Divider } from "antd";
import { Link } from "react-router-dom";

const TeacherClassList = (props) => {
    return (<React.Fragment>
        <Divider orientation="left">My Students</Divider>
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
    </React.Fragment>)
}

export default TeacherClassList;