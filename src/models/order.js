import mongoose from "mongoose";
import Product from "./product";
import User from "./user";

const OrderSchema = new mongoose.Schema(
  {
    codeId: {
      type: String,
      unique: true,
      default: function () {
        // Generate a unique codeId with a mix of numbers and alphabets
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeIdLength = 8;

        let codeId = '';
        for (let i = 0; i < codeIdLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          codeId += characters.charAt(randomIndex);
        }

        return codeId;
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true, default: "Stripe" },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: Date, required: true },
    isProcessing: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
