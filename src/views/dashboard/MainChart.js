import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { dotWave } from "ldrs"; // Import dotWave for loading animation

dotWave.register(); // Register loading effect

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  ChartDataLabels
);

const MainChart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of registrations from the API
        const registrationResponse = await fetch(
          "http://localhost:8080/api/registration/count"
        );
        const totalRegistrations = await registrationResponse.json();

        // Fetch total number of districts from the API
        const districtResponse = await fetch(
          "http://localhost:8080/api/districts/count"
        );
        const totalDistricts = await districtResponse.json();

        // Fetch total number of elders from the API
        const elderResponse = await fetch(
          "http://localhost:8080/api/elders/count"
        );
        const totalElders = await elderResponse.json();

        // Fetch total number of visitors from the API
        const visitorResponse = await fetch(
          "http://localhost:8080/api/visitors/count"
        );
        const totalVisitors = await visitorResponse.json();

        // Prepare data for the bar chart
        const chartLabels = [
          "Total Registrations",
          "Total Districts",
          "Total Elders",
          "Total Visitors",
        ];
        const chartDataValues = [
          totalRegistrations,
          totalDistricts,
          totalElders,
          totalVisitors,
        ];
        const chartColors = ["green", "blue", "yellow", "maroon"];

        setBarChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Statistics",
              backgroundColor: chartColors,
              data: chartDataValues,
            },
          ],
        });

        // Prepare data for the doughnut chart using the same data as the bar chart
        setDoughnutChartData({
          labels: chartLabels,
          datasets: [
            {
              backgroundColor: chartColors,
              data: chartDataValues,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run once when component mounts

  const barChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
    },
    maintainAspectRatio: false,
  };

  const doughnutChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
      datalabels: {
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: "50px" }}>
        <l-dot-wave size="100" speed="1" color="blue" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          width: "800px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Bar Chart: Statistics Overview</h3>
        <div style={{ width: "100%", height: "400px" }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          width: "600px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Doughnut Chart: Section Breakdown
        </h3>
        <div style={{ width: "100%", height: "600px" }}>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default MainChart;
