"use client";
import "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-moment";
import "chart.js/auto";
import "chart.js/helpers";
import { Bar, Line,Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout.js/page";
import { getAllOrdersForAllUsers } from "@/services/order";
import CountUp from "react-countup";
export default function OrdersChart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrdersForAllUsers();

        if (data.success) {
          setOrders(data.data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => {
    return acc + order.totalPrice;
  }, 0);
  const ordersByDay = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Extract labels (dates) and data (number of orders)
  const ordersChartLabels = Object.keys(ordersByDay);
  const ordersChartData = Object.values(ordersByDay);

  // Chart data for total orders
  const ordersChart = {
    labels: ordersChartLabels,
    datasets: [
      {
        label: "Total Orders",
        data: ordersChartData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Process the data to get the total price of orders for each day
  const totalPriceByDay = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.totalPrice;
    return acc;
  }, {});

  // Extract labels (dates) and data (total price)
  const priceChartLabels = Object.keys(totalPriceByDay);
  const priceChartData = Object.values(totalPriceByDay);

  // Chart data for total price
  const priceChart = {
    labels: priceChartLabels,
    datasets: [
      {
        label: 'Total Price',
        data: priceChartData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const paymentMethodCounts = orders.reduce((acc, order) => {
    const paymentMethod = order.paymentMethod;
    acc[paymentMethod] = (acc[paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(paymentMethodCounts),
    datasets: [
      {
        data: Object.values(paymentMethodCounts),
        backgroundColor: [
          "#D1F755", // color for Stripe
          // Add more colors for other payment methods if needed
        ],
      },
    ],
  };


  return (
    <AdminLayout isSidebarFixed={false} fl={false} className="fixed">
    <div class="grid grid-cols-3 gap-4 mx-auto mt-20">
      <div class=" box a col-span-2 row-span-1 bg-gray-800  font-Salsa rounded p-6 text-2xl">
        <div className="flex flex-row gap-2">
          <div className="border bg-white text-black p-3 rounded-lg ">
            <h1>
              Total Bookings: <CountUp end={totalOrders} duration={2} />
            </h1>
          </div>
          <div className="border bg-white text-black p-3 rounded-lg ">
            <h1>
              Total Revenue:  <CountUp end={totalRevenue} duration={2} />

            </h1>
          </div>
        
        </div>
      </div>
      <div class="box b col-span-1 row-span-2  border border-black text-black font-Salsa rounded p-6 text-2xl flex flex-col">
        <div>
          <h2 className="text-center font-Salsa">Payment Methord type</h2>
        </div>
        <div>
        <Doughnut data={pieChartData} />
        </div>
      </div>
      <div class="box c col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
        <h2 className="text-center">Bookings Chart</h2>
        <div>
        <Line data={ordersChart} />
        </div>
      </div>
      <div class="box d col-span-1 row-span-1  border border-black text-black font-Salsa rounded p-6 text-2xl">
        <h2 className="text-center">Total Price Chart</h2>
       
        <div>
        <Bar data={priceChart} />
        </div>
      </div>
    </div>
  </AdminLayout>

  );
}
