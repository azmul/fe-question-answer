import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Header from "../components/Header";

function Chat() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    const rawResponse = await fetch("http://127.0.0.1:8000/api/v1/answer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
            label="Select a Language to Get Your Answer"
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
        {answer && answer.answer}
      </main>
    </>
  );
}

export default Chat;
