// pages/api/admin/orders/scan-orders.js

import connectToDB from "@/database";
import Order from "@/models/order";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDB();

  const { id } = req.query;

  try {
    // Find order by id
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send back all order details
    return res.status(200).json({
      success: true,
      orderDetails: order,
    });
  } catch (error) {
    console.error("Error while fetching order details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
