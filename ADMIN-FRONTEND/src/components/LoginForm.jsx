// import React from 'react';
// import { Form, Input, Checkbox, Button } from 'antd';

// const LoginForm = () => {
//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Form
//         name="basic"
//         className="bg-white p-6 shadow-md rounded-md w-full max-w-md"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
//         <Form.Item
//           label={<span className="font-medium">Username</span>}
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         <Form.Item
//           label={<span className="font-medium">Password</span>}
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//         >
//           <Input.Password className="border-gray-300 rounded-md" />
//         </Form.Item>

//         <Form.Item name="remember" valuePropName="checked">
//           <Checkbox className="text-gray-700">Remember me</Checkbox>
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
//           >
//             Submit
//           </Button>
//         </Form.Item>
//         <p className="text-center text-sm text-gray-600">
//           Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
//         </p>
//       </Form>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/allproducts");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form
        name="basic"
        className="bg-white p-6 shadow-md rounded-md w-full max-w-md"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Show error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <Form.Item
          label={<span className="font-medium">Email</span>}
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input className="border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium">Password</span>}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters long!',
            },
          ]}
        >
          <Input.Password className="border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="text-gray-700">Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Login
          </Button>
        </Form.Item>
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <button onClick={handleSignup} className="text-blue-500">Sign up</button>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
