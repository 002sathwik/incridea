import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category:Joi.string().required(),
  prize: Joi.number().required(),
  venuInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
  host1: Joi.string().required(),
  host2: Joi.string().required(),
  phone: Joi.number().required(),

  days:Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

 

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        prize,
        venuInfo,
        onSale,
        priceDrop,
        phone,
        host1,
        host2,
        days
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        prize,
        venuInfo,
        onSale,
        priceDrop,
        phone,
        host1,
        host2,
        days
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: " Event Added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the Event! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
