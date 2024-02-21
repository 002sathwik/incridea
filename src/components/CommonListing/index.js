"use client";

import EventTitle from "./EventTitle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";

export default function CommonListing({ data, st, ad }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  const add = ad
    ? "mt-[10px] ml-30  mx-auto max-w-screen-xl m-5 "
    : " mt-[10px] mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 m-5 ";
  const stt = st
    ? "mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
    : "grid gap-6 sm:grid-cols-1 lg:grid-cols-4";
  return (
    <section>
      <div className={add}>
        <div className={stt}>
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
               
                    <div class="card">
                      <EventTitle item={item} />
                       <ProductButton item={item}/>
                    </div>
               
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}



