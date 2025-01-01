// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';
// const { Header, Sider, Content } = Layout;
// const AppLayout = ({children}) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout className='h-screen'>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical p-8">
//             <h1 className='text-white text-center font-extrabold'>VEND ZILLA</h1>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <UserOutlined />,
//               label: 'nav 1',
//             },
//             {
//               key: '2',
//               icon: <VideoCameraOutlined />,
//               label: 'nav 2',
//             },
//             {
//               key: '3',
//               icon: <UploadOutlined />,
//               label: 'nav 3',
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default AppLayout;


// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   FormOutlined,
//   InfoOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';
// import { useNavigate } from 'react-router-dom';
// const { Header, Sider, Content } = Layout;

// const AppLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const navigate = useNavigate();
//   return (
//     <Layout className="h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical p-4">
//           <h1 className="text-white text-center font-extrabold text-xl">VEND ZILLA</h1>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '/addproduct',
//               icon: <FormOutlined />,
//               label: 'Add Product',
//             },
//             {
//               key: '/allproducts',
//               icon: <InfoOutlined />,
//               label: 'View Products',
//             },
//             {
//               key: '3',
//               icon: <UploadOutlined />,
//               label: 'nav 3',
//             },
//           ]}
//           onClick={(items)=>{
//             console.log(items.key);
//             navigate(items.key);
//           }}
//         />
//       </Sider>

//       {/* Main Layout */}
//       <Layout className="h-full">
//         {/* Header */}
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//           className="flex items-center justify-between"
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>

//         {/* Content */}
//         <Content
//           style={{
//             margin: '16px',
//             padding: '16px',
//             minHeight: 'calc(100vh - 64px - 32px)', // Account for Header and margin
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//             overflow: 'auto',
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AppLayout;




// import React, { useState, useEffect } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   InfoOutlined,
//   FormOutlined,
//   LogoutOutlined,
//   ShoppingCartOutlined, // Import the orders icon
//   MessageOutlined, // Import the feedback icon
// } from "@ant-design/icons";
// import { Button, Layout, Menu, theme, Dropdown } from "antd";
// import { useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const AppLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [username, setUsername] = useState(null);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const navigate = useNavigate();

//   // Check for logged-in user's name from localStorage
//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setUsername(null);
//     navigate("/");
//   };

//   // Dropdown menu for the logged-in user
//   const userMenu = (
//     <Menu>
//       <Menu.Item key="username" icon={<UserOutlined />}>
//         Hello, {username}
//       </Menu.Item>
//       <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout className="h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical p-4">
//           <h1 className="text-white text-center font-extrabold text-xl">VEND ZILLA</h1>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             {
//               key: "/addproduct",
//               icon: <FormOutlined />,
//               label: "Add Product",
//             },
//             {
//               key: "/allproducts",
//               icon: <InfoOutlined />,
//               label: "View Products",
//             },
//             {
//               key: "/allorders",
//               icon: <ShoppingCartOutlined />, // Orders icon added here
//               label: "View Orders",
//             },
//             {
//               key: "/feedback", // New Feedback tab
//               icon: <MessageOutlined />, // Feedback icon
//               label: "Feedback", // Tab name
//             },
//           ]}
//           onClick={(items) => {
//             navigate(items.key);
//           }}
//         />
//       </Sider>

//       {/* Main Layout */}
//       <Layout className="h-full">
//         {/* Header */}
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//           className="flex items-center justify-between"
//         >
//           {/* Left button for collapsing the sidebar */}
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />

//           {/* Right user menu */}
//           {username ? (
//             <Dropdown overlay={userMenu} placement="bottomRight">
//               <Button icon={<UserOutlined />} type="text">
//                 {username}
//               </Button>
//             </Dropdown>
//           ) : (
//             <Button type="text" onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           )}
//         </Header>

//         {/* Content */}
//         <Content
//           style={{
//             margin: "16px",
//             padding: "16px",
//             minHeight: "calc(100vh - 64px - 32px)", // Account for Header and margin
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//             overflow: "auto",
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AppLayout;



import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  InfoOutlined,
  FormOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  DashboardOutlined, // Import the dashboard icon
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  // Check for logged-in user's name from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  // Dropdown menu for the logged-in user
  const userMenu = (
    <Menu>
      <Menu.Item key="username" icon={<UserOutlined />}>
        Hello, {username}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="h-screen overflow-hidden">
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical p-4">
          <h1 className="text-white text-center font-extrabold text-xl">MyStore</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/dashboard", // Dashboard key
              icon: <DashboardOutlined />, // Dashboard icon
              label: "Dashboard", // Dashboard label
            },
            {
              key: "/addproduct",
              icon: <FormOutlined />,
              label: "Add Product",
            },
            {
              key: "/allproducts",
              icon: <InfoOutlined />,
              label: "View Products",
            },
            {
              key: "/allorders",
              icon: <ShoppingCartOutlined />,
              label: "View Orders",
            },
            {
              key: "/feedback",
              icon: <MessageOutlined />,
              label: "Feedback",
            },
          ]}
          onClick={(items) => {
            navigate(items.key);
          }}
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="h-full">
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex items-center justify-between"
        >
          {/* Left button for collapsing the sidebar */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          {/* Right user menu */}
          {username ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button icon={<UserOutlined />} type="text">
                {username}
              </Button>
            </Dropdown>
          ) : (
            <Button type="text" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            minHeight: "calc(100vh - 64px - 32px)", // Account for Header and margin
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
