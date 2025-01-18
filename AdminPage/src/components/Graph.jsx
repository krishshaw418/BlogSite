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
  
  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const blogTitle = blogInteractions.labels[context.dataIndex];
            const views = context.raw;
            return `${blogTitle}: ${views} views`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Hides the labels at the bottom (x-axis)
        },
        grid: {
          drawTicks: true, // Shows tick marks on the axis
        },
      },
      y: {
        beginAtZero: true, // Ensures y-axis starts at zero
      },
    },
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

    <div className="flex flex-col justify-center items-center text-3xl m-2 p-3">
      MONTHLY BLOG PERFORMANCE STATS
    </div>
    {/* <div style={{ width: "80%", maxWidth: "800px", marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Number of Visits Over Time</h3>
      <Line data={visitsOverTime} />
    </div> */}

    <div style={{ width: "80%", maxWidth: "800px", marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Views Per Post</h3>
      <Bar data={blogInteractions} options={options} />
    </div>

    <div style={{ width: "80%", maxWidth: "500px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Likes Per Post</h3>
      <Pie data={likesData} />
    </div>
  </div>
  );
};

export default Graph;