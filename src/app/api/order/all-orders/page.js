// pages/api/admin/orders/all-orders.js

import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const allOrders = await Order.find({}).populate("orderItems.product");

      if (allOrders !== null && allOrders.length > 0) {
        return NextResponse.json({
          success: true,
          data: allOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No orders found for any user",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.error("Error fetching all orders:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
      error: e.toString(),
    });
  }
}
