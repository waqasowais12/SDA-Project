import React, { useEffect, useState } from "react";
import { Spin, Alert, Table, Button, message } from "antd";
import axios from "axios";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/all-orders");
        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle delete order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/delete/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      message.success("Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err.response?.data || err.message);
      message.error("Failed to delete order");
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  // Table columns for Ant Design Table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: ["shippingAddress", "name"],
      key: "shippingAddress.name",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `$${text}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Cart Items",
      key: "cartItems",
      render: (_, record) => (
        <ul>
          {record.cartItems.map((item, index) => (
            <li key={index}>
              {item.productName} - {item.quantity} x ${item.productPrice} = ${item.total}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Ordered At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">All Orders</h1>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ViewAllOrders;
