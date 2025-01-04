import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Graph = ({ data }) => {
  // Example Data
  const visitsOverTime = {
    labels: data?.visits?.map((item) => item.date) || ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Website Visits",
        data: data?.visits?.map((item) => item.visits) || [200, 300, 250],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const blogInteractions = {
    labels: data?.blogs?.map((blog) => blog.title) || ["Blog A", "Blog B", "Blog C"],
    datasets: [
      {
        label: "Views",
        data: data?.blogs?.map((blog) => blog.views) || [120, 90, 150],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const likesData = {
    labels: data?.blogs?.map((blog) => blog.title) || ["Blog A", "Blog B", "Blog C"],
    datasets: [
      {
        data: data?.blogs?.map((blog) => blog.likes) || [30, 50, 40],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div
    className="graph-container"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    }}
  >
    <div style={{ width: "80%", maxWidth: "800px", marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Number of Visits Over Time</h3>
      <Line data={visitsOverTime} />
    </div>

    <div style={{ width: "80%", maxWidth: "800px", marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Overall Blog Interactions</h3>
      <Bar data={blogInteractions} />
    </div>

    <div style={{ width: "80%", maxWidth: "500px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Number of Likes Per Blog Post</h3>
      <Pie data={likesData} />
    </div>
  </div>
  );
};

export default Graph;