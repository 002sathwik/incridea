"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div
      className="border border-black border-b-none"
      onClick={() => router.push(`/product/${item._id}`)}
    >
      <div className="group overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover transition duration-800 group-hover:scale-105"
        />
      </div>

      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
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
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
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
