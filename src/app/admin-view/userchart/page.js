// UserChart.js
"use client";
import "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-moment";
import "chart.js/auto";
import "chart.js/helpers";
import CountUp from "react-countup";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import AdminLayout from "@/components/AdminLayout.js/page";
import Spinner from "@/components/Spinner/page";
import { getAllUsers } from "@/services/users";
import { useEffect, useState } from "react";
import moment from "moment"; // Import moment library
import { CircularProgress } from "@material-ui/core";

export default function UserChart() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();

        if (data.success) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return<div className="flex items-center justify-center h-screen">
       <Spinner/>
  </div>;
  }

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;
  const customerUsers = users.filter((user) => user.role === "customer").length;
  const adminUsers = users.filter((user) => user.role === "admin").length;

  // Create data for the chart
  const chartData = {
    labels: ["Total Users"],
    datasets: [
      {
        label: "Number of Users",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [totalUsers],
      },
    ],
  };

  const lineData = {
    labels: ["Total Users", "Active Users", "Inactive Users"],
    datasets: [
      {
        label: "Number of Users (Bar Chart)",
        type: "bar", // Specify chart type as 'bar'
        backgroundColor: [
          "rgba(75,192,192,0.2)",
          "rgba(0,255,0,0.2)",
          "rgba(255,0,0,0.2)",
        ],
        borderColor: [
          "rgba(75,192,192,1)",
          "rgba(0,255,0,1)",
          "rgba(255,0,0,1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(75,192,192,0.4)",
          "rgba(0,255,0,0.4)",
          "rgba(255,0,0,0.4)",
        ],
        hoverBorderColor: [
          "rgba(75,192,192,1)",
          "rgba(0,255,0,1)",
          "rgba(255,0,0,1)",
        ],
        data: [totalUsers, activeUsers, inactiveUsers],
      },
      {
        label: "Number of Users (Line Chart)",
        type: "line", // Specify chart type as 'line'
        fill: false, // Don't fill the area under the line
        borderColor: "rgba(0,0,255,1)", // Blue color for the line
        borderWidth: 2,
        data: [totalUsers, activeUsers, inactiveUsers],
      },
    ],
  };
  const customerCount = users.filter((user) => user.role === "customer").length;
  const adminCount = users.filter((user) => user.role === "admin").length;
  const pieChartData = {
    labels: ["Customers", "Admins"],
    datasets: [
      {
        data: [customerCount, adminCount],
        backgroundColor: ["#FF2323", "rgba(54,162,235,0.7)"],
      },
    ],
  };
  const doughnutChartData = {
    labels: ["Customers", "Admins"],
    datasets: [
      {
        data: [customerCount, adminCount],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
      },
    ],
  };

  return (
    <AdminLayout >
      <div class="grid grid-cols-3 gap-4 mx-auto mt-20">
        <div class=" box a col-span-2 row-span-1 bg-gray-800  font-Salsa rounded p-6 text-2xl">
          <div className="flex flex-row gap-2">
            <div className="border bg-white text-black p-3 rounded-lg ">
              <h1>
                Total Users: <CountUp end={totalUsers} duration={2} />
              </h1>
            </div>
            <div className="border bg-white text-black p-3 rounded-lg ">
              <h1>
                Total Admins: <CountUp end={adminCount} duration={2} />
              </h1>
            </div>
            <div className="border bg-white text-black p-3 rounded-lg ">
              <h1>
                Total Customers: <CountUp end={customerCount} duration={2} />
              </h1>
            </div>
          </div>
        </div>
        <div class="box bg-white col-span-1 row-span-2  border border-black text-black font-Salsa rounded p-6 text-2xl flex flex-col">
          <div>
            <h2 className="text-center">User Distribution</h2>
          </div>
          <div>
            <Pie data={pieChartData} />
          </div>
        </div>
        <div class="box bg-white col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
          <h2 className="text-center">Total Users Bar Chart</h2>
          <div>
            <Bar data={chartData} />
          </div>
        </div>
        <div class="box bg-white col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
          <h2 className="text-center">Customer vs Admin </h2>
          <div>
            <Line data={lineData} />
          </div>
        </div>
      </div>
      <svg className="wave-bokkings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FF2323" fill-opacity="1" d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,133.3C840,149,960,139,1080,160C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
     
    </AdminLayout>
  );
}
