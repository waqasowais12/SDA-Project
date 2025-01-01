import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalIncome: 0,
    activeUsers: 0,
    totalProducts: 0,
  });

  // Fetch dashboard data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((response) => setDashboardData(response.data))
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  // Extract data for charts
  const ordersData = dashboardData.orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    totalAmount: order.totalAmount,
  }));

  // Pie chart data for payment status
  const paymentStatusData = [
    {
      name: "Paid",
      value: dashboardData.orders.filter((order) => order.paymentStatus === "paid").length,
    },
    {
      name: "Pending",
      value: dashboardData.orders.filter((order) => order.paymentStatus === "pending").length,
    },
  ];

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Cards */}
        <Col span={6}>
          <Card>
            <Statistic title="Total Income" value={`$${dashboardData.totalIncome}`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Users" value={dashboardData.activeUsers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Products" value={dashboardData.totalProducts} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={dashboardData.orders.length} />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Order Amounts by Date">
            <BarChart width={500} height={300} data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmount" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Payment Status">
            <PieChart width={300} height={300}>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
