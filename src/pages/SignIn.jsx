import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { API_URL } from "../constant";

function SignIn() {
  const navigate = useNavigate();

  const { addUser } = useStore((state) => {
    return {
      addUser: state.addUser,
    };
  });

  function goSignUp() {
    navigate("/sign-up");
  }

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
      const { access_token } = user;
      if (access_token) {
        addUser(user);
        navigate("/");
      } else {
        notification.error({
          message: `User Not Found`,
          description: "Your Provided Credential are not Correct",
          placement: "top",
          duration: 1.5,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <h1>Sign In</h1>
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
          name="username"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
            Sign In
          </Button>
          <Button type="link" htmlType="button" onClick={goSignUp}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SignIn;
