import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Card } from "antd";
import Header from "../components/Header";

// eslint-disable-next-line react/prop-types
const CollectionCreateForm = ({ open, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new article"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          title: null,
          content: null,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the content!",
            },
          ]}
        >
          <Input.TextArea type="textarea" rows={10} cols={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function Document() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const onCreate = async (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);

    setLoading(true);
    const rawResponse = await fetch("http://127.0.0.1:8000/api/v1/articles", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 2,
        title: values.title,
        content: values.content,
      }),
    });

    const content = await rawResponse.json();
    console.log(content);
    setOpen(false);
    setLoading(false);
  };

  const getContents = async () => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/v1/users/2", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhem11bGdAZ21haWwuY29tIiwiZXhwIjoxNjk3OTA0NTUxfQ.fMTj050Bv7qJgpQ4oyV-Dtu8LnkvLK8c6oKxlBcRg5A",
      },
    });

    const user = await rawResponse.json();
    setArticles(user.articles);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <>
      <Header />
      <main className="container-md">
        <div>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            New Article
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            loading={loading}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </div>
        <br />
        {articles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            extra={
              <Button type="primary" onClick={() => handleEdit(article.id)}>
                Edit
              </Button>
            }
          >
            <p>{article.content}</p>
          </Card>
        ))}
      </main>
    </>
  );
}

export default Document;
