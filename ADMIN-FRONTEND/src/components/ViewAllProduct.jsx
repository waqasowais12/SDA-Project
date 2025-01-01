// import React from 'react';
// import { Space, Table, Tag } from 'antd';
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
// const ViewAllProducts = () => <Table columns={columns} dataSource={data} />;
// export default ViewAllProducts;


import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Input, Form, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/all");
        setProducts(response.data.products || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null, // Reset the image field
    });
    setIsEditModalVisible(true);
  };

  // Handle Edit Submit
  // const handleEditSubmit = async (values) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", values.name);
  //     formData.append("price", values.price);
  //     formData.append("description", values.description);
  
  //     // If a new image is selected, append it to the form data
  //     if (values.image && values.image.file && values.image.file.originFileObj) {
  //       console.log("Uploading new image...");
  //       formData.append("image", values.image.file.originFileObj);
  //     } else {
  //       console.log("No new image selected. Keeping existing image URL...");
  //       formData.append("imageURL", editingProduct.imageURL);  // Retain the old image URL if no new image is provided
  //     }
  
  //     const response = await axios.put(
  //       `http://localhost:5000/api/products/edit/${editingProduct._id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  
  //     console.log("Response after product update:", response.data.product);
  
  //     setProducts((prev) =>
  //       prev.map((product) =>
  //         product._id === editingProduct._id ? response.data.product : product
  //       )
  //     );
  
  //     setIsEditModalVisible(false);
  //     message.success("Product updated successfully!");
  //   } catch (err) {
  //     console.error("Error updating product:", err.response?.data || err.message);
  //     message.error("Failed to update product");
  //   }
  // };

  const handleEditSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
  
      // Check if a new image is selected
      const imageFile = values.image[0]?.originFileObj;
      console.log('Image file:', imageFile);
  
      if (imageFile) {
        // If an image is selected, append it to the form data
        formData.append("image", imageFile);
      } else {
        // If no new image is selected, retain the old image URL (optional)
        formData.append("imageURL", editingProduct.imageURL);
      }
  
      // Log the form data being sent
      console.log("Form data being sent:", formData);
  
      const response = await axios.put(
        `http://localhost:5000/api/products/edit/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response after product update:", response.data.product);
  
      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingProduct._id ? response.data.product : product
        )
      );
  
      setIsEditModalVisible(false);
      message.success("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err.message);
      message.error("Failed to update product");
    }
  };
  
  
  // Handle Delete
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      message.success("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
      message.error("Failed to delete product");
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                {product.imageURL && (
                  <img
                    src={`http://localhost:5000${product.imageURL}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                  />
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<Modal
  title="Edit Product"
  visible={isEditModalVisible}
  onCancel={() => {
    setIsEditModalVisible(false);
    form.resetFields(); // Reset form on modal close
  }}
  footer={null}
>
  <Form form={form} onFinish={handleEditSubmit} layout="vertical">
    <Form.Item
      name="name"
      label="Product Name"
      rules={[{ required: true, message: "Please enter the product name" }]}
    >
      <Input placeholder="Enter product name" />
    </Form.Item>
    <Form.Item
      name="price"
      label="Price"
      rules={[{ required: true, message: "Please enter the price" }]}
    >
      <Input type="number" placeholder="Enter price" />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please enter the description" }]}
    >
      <Input.TextArea placeholder="Enter description" />
    </Form.Item>
    <Form.Item
      name="image"
      label="Product Image"
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
    >
      <Upload
        beforeUpload={() => false}
        listType="picture"
        maxCount={1}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Save Changes
      </Button>
    </Form.Item>
  </Form>
</Modal>
    </div>
  );
};

export default ViewAllProducts;
