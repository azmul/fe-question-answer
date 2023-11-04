import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { minBy, maxBy, upperFirst } from "lodash";
import Typewriter from "typewriter-effect";
import Header from "../components/Header/Header";
import { useStore } from "../Store";
import { API_URL } from "../constant";
import { calculateSimilarity } from "../helpers/similarity";

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
    const response = await rawResponse.json();

    const minContent = minBy(response.data, function (item) {
      return item.answer.length;
    });

    const contents = response.data.filter(
      (item) => item.model != minContent.model
    );

    const similarity = calculateSimilarity(
      contents[0].answer,
      contents[1].answer
    );

    if (similarity < 50) {
      let answer = "";
      if (contents[0].answer.length > 30) {
        answer += upperFirst(contents[0].answer);
      }
      if (contents[1].answer.length > 30) {
        answer += `. ${upperFirst(contents[1].answer)}`;
      }
      if (contents[0].answer.length < 30 && contents[1].answer.length < 30) {
        if (contents[0].answer.length === contents[1].answer.length) {
          answer += `. ${upperFirst(contents[1].answer)}`;
        } else {
          const maxContent = maxBy(contents, function (item) {
            return item.answer.length;
          });
          answer += maxContent.answer;
        }
      }
      setAnswer(answer);
    } else {
      const maxContent = maxBy(contents, function (item) {
        return item.answer.length;
      });
      setAnswer(maxContent.answer);
    }

    setLoading(false);
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
        {answer && (
          <Typewriter
            options={{
              strings: answer,
              autoStart: true,
              delay: 15,
            }}
          />
        )}
      </main>
    </>
  );
}

export default Chat;
