import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rate, List, Divider, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/");
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }

  return (
    <div className="feedback-page">
      <h1 className="mb-4 font-bold text-xl">Customer Feedback</h1>
      <Divider />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={feedbacks}
        renderItem={(feedback) => (
          <List.Item key={feedback._id}>
            <Card bordered={false} style={{ width: "100%" }}>
              <h3>{feedback.name}</h3>
              <p>{feedback.email}</p>
              <Rate disabled value={feedback.rating} />
              <p>{feedback.message}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FeedbackPage;
