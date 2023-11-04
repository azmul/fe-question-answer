import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Card,
  Space,
  Popconfirm,
  Result,
} from "antd";
import Header from "../components/Header/Header";
import { useStore } from "../Store";
import { API_URL } from "../constant";

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

const CollectionEditForm = ({ open, onEdit, onCancel, article, loading }) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    title: article?.title,
    content: article?.content,
  });
  return (
    <Modal
      open={open}
      title="Edit article"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onEdit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
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

function Article() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  });

  const getContents = useCallback(async () => {
    const rawResponse = await fetch(`${API_URL}/api/v1/users/${user.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const content = await rawResponse.json();
    setArticles(content.articles);
  }, [user.access_token, user.id]);

  const onCreate = async (values) => {
    setLoading(true);
    setLoading(true);
    await fetch(`${API_URL}/api/v1/articles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        title: values.title,
        content: values.content,
      }),
    });

    setOpen(false);
    setLoading(false);
    getContents();
  };

  const onEdit = async (values) => {
    setLoading(true);
    setLoading(true);
    await fetch(`${API_URL}/api/v1/articles/${article.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
      }),
    });

    setEditOpen(false);
    setLoading(false);
    getContents();
  };

  const handleEdit = (article) => {
    setArticle(article);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/v1/articles/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    getContents();
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
            Add Article
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            loading={loading}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <CollectionEditForm
            open={editOpen}
            onEdit={onEdit}
            loading={loading}
            article={article}
            onCancel={() => {
              setEditOpen(false);
              setArticle(null);
            }}
          />
        </div>
        <br />
        {articles && articles.length > 0 ? (
          articles?.map((article) => (
            <Card
              key={article?.id}
              title={article?.title}
              extra={
                <Space>
                  <Button type="primary" onClick={() => handleEdit(article)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete"
                    description="Are you sure want to delete?"
                    onConfirm={() => handleDelete(article.id)}
                  >
                    <Button type="link" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              }
            >
              <p>{article?.content}</p>
            </Card>
          ))
        ) : (
          <Result
            status="warning"
            title="There are no articles"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
                key="create-new-article"
              >
                Add New Article
              </Button>
            }
          />
        )}
      </main>
    </>
  );
}

export default Article;
