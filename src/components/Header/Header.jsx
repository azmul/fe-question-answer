import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { useStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const navigate = useNavigate();

  const { addUser } = useStore((state) => {
    return {
      addUser: state.addUser,
    };
  });
  function handleLogout() {
    addUser(null);
    navigate("/sign-in");
  }
  return (
    <div className="container-md">
      <Space wrap className={styles.header}>
        <Button type="link">
          {" "}
          <Link to="/">Document</Link>
        </Button>
        <Button type="link">
          {" "}
          <Link to="/chat">Chat</Link>
        </Button>
        <Button type="link">
          {" "}
          <Link to="/profile">Profile</Link>
        </Button>
        <Button type="link" onClick={handleLogout}>
          {" "}
          Logout{" "}
        </Button>
      </Space>
    </div>
  );
}

export default Header;
