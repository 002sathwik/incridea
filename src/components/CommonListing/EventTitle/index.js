"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div className=" " onClick={() => router.push(`/product/${item._id}`)}>
      <div className="group overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product image"
          className=" rounded-t-lg  h-full w-full object-cover transition duration-800 group-hover:scale-105"
        />
      </div>
      {item.category === "art" ? (
        <div
          className="absolute top-0 w-40 h-8 rounded-r-lg p-1 "
          style={{
            backgroundImage:
              "linear-gradient(to right top, #df6faf, #c45ea6, #a84e9c, #8c4092, #6e3388, #593587, #423785, #273781, #084182, #004980, #00507c, #0d5676)",
          }}
        >
          <p className="p-1 text-[12px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Art
          </p>
        </div>
      ) : item.category === "tech" ? (
        <div
          className="absolute top-0 w-40 h-8 rounded-r-lg p-1 "
          style={{
            backgroundImage:
              "linear-gradient(to right top, #df6faf, #c45ea6, #a84e9c, #8c4092, #6e3388, #593587, #423785, #273781, #084182, #004980, #00507c, #0d5676)",
          }}
        >          <p className="p-1 text-[12px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Tech
          </p>
        </div>
      ) : item.category === "cultural" ? (
        <div
          className="absolute top-0 w-40 h-8 rounded-r-lg p-1"
          style={{
            backgroundImage:
              "linear-gradient(to right top, #df6faf, #c45ea6, #a84e9c, #8c4092, #6e3388, #593587, #423785, #273781, #084182, #004980, #00507c, #0d5676)",
          }}
        >          <p className="p-1 text-[12px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Cultural
          </p>
        </div>
      ) : null}

      {item.onSale === "yes" ? (
        <div className="absolute right-0 top-0 m-2 rounded-full bg-yellow-500">
          <p className="  p-1 text-[12px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div>
        <h3 className="md-2 m-3 p-2  text-[15px] border text-center uppercase bg-yellow-500 border-black text-white  font-Rubik font-bold">
          {item.name}
        </h3>
      </div>
      <div className="rounded-full  font-Salsa  font-bold mt-1.5 text-center   bg-white px-5 py-3 text-xs  uppercase tracking-wide text-black  mx-auto flex-col items-start ">
        <div className="mb-2 flex ">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`₹ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold text-red-700">{`₹ ${(
              item.price -
              item.price * (item.priceDrop / 100)
            ).toFixed(2)}`}</p>
          ) : null}
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold">{`-(${item.priceDrop}%)off`}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
