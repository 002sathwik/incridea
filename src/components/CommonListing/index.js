"use client";

import EventTitle from "./EventTitle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
export default function CommonListing({ data ,st }) {
    const router = useRouter();
  
    useEffect(() => {
      router.refresh();
    }, []);
     const stt = st?"mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2":"   grid gap-6 sm:grid-cols-1 lg:grid-cols-4"
  return (
    <section>
      <div className=" mt-[10px] ml-20 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 m-5 ">
       

        <div className={stt}>
        {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <EventTitle  item={item} />
                   <ProductButton item={item}/>
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
