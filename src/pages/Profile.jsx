import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useStore } from "../Store";
import Header from "../components/Header";

function Profile() {
  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  });

  return (
    <>
      <Header />
      <div className="container-md">
        <Card
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
          title="User Info"
        >
          <p>
            Name: <b> {user.name}</b>
          </p>
          <p>
            ID: <b> {user.id}</b>
          </p>
          <p>
            Email: <b>{user.username}</b>
          </p>
        </Card>
      </div>
    </>
  );
}

export default Profile;
