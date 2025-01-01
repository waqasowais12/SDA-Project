// import React, { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
// } from 'antd';

// const { TextArea } = Input;

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const AddProductForm = () => {
//   const [componentDisabled, setComponentDisabled] = useState(false);

//   const onFinish = (values) => {
//     console.log('Form Values:', values);
//     alert('Form submitted successfully!');
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Form Failed:', errorInfo);
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>

//         {/* Disable Form Toggle */}
//         <Checkbox
//           checked={componentDisabled}
//           onChange={(e) => setComponentDisabled(e.target.checked)}
//           className="mb-4"
//         >
//           Form Disabled
//         </Checkbox>

//         {/* Form */}
//         <Form
//           name="addProduct"
//           layout="vertical"
//           disabled={componentDisabled}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please enter the product name!' }]}
//           >
//             <Input placeholder="Enter product name" />
//           </Form.Item>

//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: 'Please enter the product price!' }]}
//           >
//             <InputNumber className="w-full" placeholder="Enter product price" />
//           </Form.Item>

//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: 'Please enter a description!' }]}
//           >
//             <TextArea rows={4} placeholder="Enter product description" />
//           </Form.Item>

//           <Form.Item
//             label="Image Upload"
//             name="image"
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//             rules={[{ required: true, message: 'Please upload an image!' }]}
//           >
//             <Upload action="/upload.do" listType="picture-card">
//               <div>
//                 <PlusOutlined />
//                 <div>Upload</div>
//               </div>
//             </Upload>
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="w-full">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddProductForm;


import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddProductForm = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const token = localStorage.getItem('token');

  const onFinish = async (values) => {
    const formData = new FormData();

    // Validate image file
    const imageFile = values.image[0]?.originFileObj;
    if (!imageFile) {
      message.error('Please upload an image!');
      return;
    }

    formData.append('image', imageFile);
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('description', values.description);

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      message.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Error adding product');
    }
  };

  const validateImageType = (file) => {
    const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidType) {
      message.error('You can only upload JPG or PNG files!');
    }
    return isValidType || Upload.LIST_IGNORE;
  };

  return (
    <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1 className="font-extrabold text-center text-2xl p-5">Add Product</h1>
      <Form.Item
        label="Product Name"
        name="name"
        rules={[
          { required: true, message: 'Please input the product name!' },
          { min: 3, message: 'Product name must be at least 3 characters long!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the product price!' },
          {
            pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Please enter a valid positive number (e.g., 10 or 10.99)!',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input the product description!' },
          { min: 10, message: 'Description must be at least 10 characters long!' },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Image Upload"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          { required: true, message: 'Please upload an image!' },
          {
            validator: (_, value) =>
              value && value.length > 0
                ? Promise.resolve()
                : Promise.reject(new Error('Please upload at least one image!')),
          },
        ]}
      >
        <Upload
          listType="picture-card"
          beforeUpload={validateImageType}
          maxCount={1} // Limit to one image
        >
          <div>
            <PlusOutlined />
            <div>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
