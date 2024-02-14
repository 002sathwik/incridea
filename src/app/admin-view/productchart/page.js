"use client";
import "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-moment";
import "chart.js/auto";
import "chart.js/helpers";
import CountUp from "react-countup";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import AdminLayout from "@/components/AdminLayout.js/page";
import { getAllAdminProducts } from "@/services/product";
import { useEffect, useState } from "react";

export default function ProductChart() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAdminProducts();

        if (data.success) {
          setProductData(data.data);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate the total number of products
  const totalProducts = productData.length;
  const onSaleProducts = productData.filter(
    (product) => product.onSale === "yes"
  );
  // Create data for the chart
  const lineChartData = {
    labels: onSaleProducts.map((product) => product.name),
    datasets: [
      {
        label: "Number of Products on Sale",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointRadius: 4,
        data: onSaleProducts.map((product) => product.price),
      },
    ],
  };
  const chartData = {
    labels: ["Total Products"],
    datasets: [
      {
        label: "Number of Products",
        backgroundColor: [
          "rgba(255, 165, 0, 0.2)", // Orange
          "rgba(255, 223, 186, 0.2)", // Light Orange
          "rgba(255, 255, 0, 0.2)", // Yellow
          "rgba(255, 248, 220, 0.2)", // Light Yellow
        ],
        borderColor: [
          "rgba(255, 165, 0, 1)",
          "rgba(255, 223, 186, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 248, 220, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 165, 0, 0.4)",
          "rgba(255, 223, 186, 0.4)",
          "rgba(255, 255, 0, 0.4)",
          "rgba(255, 248, 220, 0.4)",
        ],
        hoverBorderColor: [
          "rgba(255, 165, 0, 1)",
          "rgba(255, 223, 186, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 248, 220, 1)",
        ],
        data: [totalProducts],
      },
    ],
  };

  const categoryCounts = {};
  productData.forEach((product) => {
    const category = product.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  // Create data for the pie chart
  const pieChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#D1F755", // Red
          "#F75798", // Yellow
          "#beee62", // Blue
        ],
      },
    ],
  };
  const onSaleCounts = {
    Yes: 0,
    No: 0,
  };

  productData.forEach((product) => {
    const onSale = product.onSale === "yes" ? "Yes" : "No";
    onSaleCounts[onSale]++;
  });

  // Create data for the doughnut chart
  const doughnutChartData = {
    labels: Object.keys(onSaleCounts),
    datasets: [
      {
        data: Object.values(onSaleCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Red for Yes
          "rgba(255, 205, 86, 0.8)", // Yellow for No
        ],
      },
    ],
  };

  // Create data for the first bar chart (price per product)
  const priceChartData = {
    labels: productData.map((product) => product.name),
    datasets: [
      {
        label: "Price per Product",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: productData.map((product) => product.price),
      },
    ],
  };

  // Create data for the second bar chart (prize per product)
  const prizeChartData = {
    labels: productData.map((product) => product.name),
    datasets: [
      {
        label: "Prize per Product",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 165, 0, 0.4)",
        hoverBorderColor: "rgba(255, 165, 0, 1)",
        data: productData.map((product) => product.prize), // Replace 'prize' with your actual property
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: true,
  };
  return (
    <AdminLayout isSidebarFixed={false} fl={false} className="fixed">
    <div class="grid grid-cols-3 gap-4 mx-auto mt-20">
      <div class=" box a col-span-2 row-span-1 bg-gray-800  font-Salsa rounded p-6 text-2xl">
        <div className="flex flex-row gap-2">
          <div className="border bg-white text-black p-3 rounded-lg ">
            <h1>
              Total Events: <CountUp end={totalProducts} duration={2} />
            </h1>
          </div>
          <div className="border bg-white text-black p-3 rounded-lg ">
            <h1>
              Total Events Onsale:  <CountUp end={onSaleProducts.length} duration={2} />

            </h1>
          </div>
        
        </div>
      </div>
      <div class="box b col-span-1 row-span-2  border border-black text-black font-Salsa rounded p-6 text-2xl flex flex-col">
        <div>
          <h2 className="text-center font-Salsa">Event Types Distribution</h2>
        </div>
        <div>
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>
      <div class="box c col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
        <h2 className="text-center">Prize per Event</h2>
        <div>
        <Bar data={prizeChartData} />
        </div>
      </div>
      <div class="box d col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
        <h2 className="text-center"> Events on Sale - Price Drop </h2>
        <div>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  </AdminLayout>
  );
}
