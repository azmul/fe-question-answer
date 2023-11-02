import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Typewriter from "typewriter-effect";
import Header from "../components/Header/Header";
import { useStore } from "../Store";
import { API_URL } from "../constant";

function Chat() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  });

  const onFinish = async (values) => {
    setAnswer(null);
    setLoading(true);
    const rawResponse = await fetch(`${API_URL}/api/v1/answers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        question: values.question,
        lang: values.lang,
      }),
    });
    const content = await rawResponse.json();
    setLoading(false);
    setAnswer(content);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header />
      <main className="container-md">
        <Form
          name="basic"
          initialValues={{
            question: null,
            lang: "en",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="lang"
            label="Select a Language for questioning and answering!!!"
            rules={[
              {
                required: true,
                message: "Please select language",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "en",
                  label: "English",
                },
                {
                  value: "bn",
                  label: "Bangla",
                },
                {
                  value: "ar",
                  label: "Arabic",
                },
                {
                  value: "ja",
                  label: "Japanese",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="question"
            label="Question"
            rules={[
              {
                required: true,
                message: "Please give question",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={2000} />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {answer && answer.answer && (
          <Typewriter
            options={{
              strings: answer.answer,
              autoStart: true,
              delay: 55,
            }}
          />
        )}
      </main>
    </>
  );
}

export default Chat;
