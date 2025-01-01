// import React from 'react';
// import { Form, Input, Checkbox, Button } from 'antd';

// const SignupForm = () => {
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
//         <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
//         {/* Username Field */}
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your email!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Address Field */}
//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your address!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Phone Field */}
//         <Form.Item
//           label="Phone"
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your phone number!',
//             },
//             {
//               pattern: /^[0-9]{10}$/,
//               message: 'Phone number must be 10 digits!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Password Field */}
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input.Password className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Remember Me Checkbox */}
//         <Form.Item name="remember" valuePropName="checked" className="mb-4">
//           <Checkbox className="text-gray-700">Remember me</Checkbox>
//         </Form.Item>

//         {/* Submit Button */}
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
//           Alredy have an account? <a href="#" className="text-blue-500">Login</a>
//         </p>
//       </Form>
//     </div>
//   );
// };

// export default SignupForm;


// import React, { useState } from 'react';
// import { Form, Input, Checkbox, Button } from 'antd';
// import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom

// const SignupForm = () => {
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Use useNavigate hook from React Router

//   const handlelogin = () => {
//     navigate('/');
//     };

//   // Handle form submission
//   const onFinish = async (values) => {
//     const { username, email, password, address, phone } = values;
  
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password, address, phone }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Redirect to login page upon successful signup using React Router's navigate()
//         navigate("/"); 
//       } else {
//         // Log the error details to understand more about the failure
//         console.error('Error:', data);
//         setError(data.error || "Signup failed");
//       }
//     } catch (error) {
//       // Log any network or unexpected errors
//       console.error('Something went wrong:', error);
//       setError("Something went wrong");
//     }
//   };
  

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
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
//         <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

//         {/* Show error message */}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Username Field */}
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Email Field */}
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your email!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Address Field */}
//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your address!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Phone Field */}
//         <Form.Item
//           label="Phone"
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your phone number!',
//             },
//             {
//               pattern: /^[0-9]{10}$/,
//               message: 'Phone number must be 10 digits!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Password Field */}
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//           className="mb-4"
//         >
//           <Input.Password className="border-gray-300 rounded-md" />
//         </Form.Item>

//         {/* Remember Me Checkbox */}
//         <Form.Item name="remember" valuePropName="checked" className="mb-4">
//           <Checkbox className="text-gray-700">Remember me</Checkbox>
//         </Form.Item>

//         {/* Submit Button */}
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
//           Already have an account? <button onClick={handlelogin} className="text-blue-500">Login</button>
//         </p>
//       </Form>
//     </div>
//   );
// };

// export default SignupForm;



import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook from React Router

  const handlelogin = () => {
    navigate('/');
  };

  // Handle form submission
  const onFinish = async (values) => {
    const { username, email, password, address, phone } = values;

    try {
      const response = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, address, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page upon successful signup using React Router's navigate()
        navigate("/"); 
      } else {
        // Log the error details to understand more about the failure
        console.error('Error:', data);
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      // Log any network or unexpected errors
      console.error('Something went wrong:', error);
      setError("Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Show error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Username Field */}
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              min: 3,
              message: 'Username must be at least 3 characters!',
            },
            {
              max: 20,
              message: 'Username cannot be longer than 20 characters!',
            },
          ]}
          className="mb-4"
        >
          <Input className="border-gray-300 rounded-md" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
          className="mb-4"
        >
          <Input className="border-gray-300 rounded-md" />
        </Form.Item>

        {/* Address Field */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
          className="mb-4"
        >
          <Input className="border-gray-300 rounded-md" />
        </Form.Item>

        {/* Phone Field */}
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Phone number must be 10 digits!',
            },
          ]}
          className="mb-4"
        >
          <Input className="border-gray-300 rounded-md" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
  label="Password"
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters!',
    },
  ]}
  className="mb-4"
>
  <Input.Password className="border-gray-300 rounded-md" />
</Form.Item>

        {/* Remember Me Checkbox */}
        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox className="text-gray-700">Remember me</Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Submit
          </Button>
        </Form.Item>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <button onClick={handlelogin} className="text-blue-500">Login</button>
        </p>
      </Form>
    </div>
  );
};

export default SignupForm;
