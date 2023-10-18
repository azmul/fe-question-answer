import { Button, Space } from "antd";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Space wrap>
        <Button type="link">
          {" "}
          <Link to="/">Home</Link>
        </Button>
        <Button type="link">
          {" "}
          <Link to="/document">Document</Link>
        </Button>
        <Button type="link">
          {" "}
          <Link to="/chat">Chat</Link>
        </Button>
      </Space>
    </>
  );
}

export default Header;
