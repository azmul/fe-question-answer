import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { API_URL } from "../constant";

function Login() {
  const navigate = useNavigate(); // <-- get history from hook

  const { addUser } = useStore((state) => {
    return {
      addUser: state.addUser,
    };
  });

  const onFinish = async (values) => {
    // Build formData object.
    try {
      let formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const rawResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });
      const user = await rawResponse.json();
      addUser(user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete
        style={{ width: 400 }}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
