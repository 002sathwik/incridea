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
import { CircularProgress } from "@material-ui/core";

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
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="text-white">
        <CircularProgress color="inherit" />
      </div>
    </div>
    );
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
          "#16717B", // Yellow
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
    <AdminLayout>
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
                Total Events Onsale:{" "}
                <CountUp end={onSaleProducts.length} duration={2} />
              </h1>
            </div>
          </div>
        </div>
        <div class="box bg-white  col-span-1 row-span-2  border border-black text-black font-Salsa rounded p-6 text-2xl flex flex-col">
          <div>
            <h2 className=" text-center font-Salsa">Event Types Distribution</h2>
          </div>
          <div>
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>
        <div class=" bg-white box c col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
          <h2 className="text-center">Prize per Event</h2>
          <div>
            <Bar data={prizeChartData} />
          </div>
        </div>
        <div class=" bg-white box d col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
          <h2 className="text-center"> Events on Sale - Price Drop </h2>
          <div>
            <Line data={lineChartData} />
          </div>
        </div>
      </div>
      <svg  className="wave-bokkings " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#16717B" fill-opacity="1" d="M0,160L34.3,138.7C68.6,117,137,75,206,69.3C274.3,64,343,96,411,106.7C480,117,549,107,617,96C685.7,85,754,75,823,74.7C891.4,75,960,85,1029,90.7C1097.1,96,1166,96,1234,96C1302.9,96,1371,96,1406,96L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </AdminLayout>
  );
}
