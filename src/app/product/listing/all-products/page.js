"use client";
import CommonListing from "@/components/CommonListing";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner/page";
import { getAllAdminProducts } from "@/services/product";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [loading, setloading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      getAllAdminProducts()
        .then((products) => {
          setAllProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          setloading(false);
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  const totalProducts = allProducts ? allProducts.data.length : 0;

  // Calculate total number of products on sale
  const totalProductsOnSale = allProducts
    ? allProducts.data.filter((product) => product.onSale == "yes").length
    : 0;
  const tech = allProducts
    ? allProducts.data.filter((product) => product.category == "tech").length
    : 0;
  return (
    <>
      <Navbar />
      <div className="AllListing">
        <div className="bg-indigo-600 px-4 py-3 text-white mt-14">
          <p className="text-center text-sm font-medium  font-Salsa">
            Love Tech and art ?
            <a href="#" className="inline-block underline">
              Check out this new Events!
            </a>
          </p>
        </div>
        <div>
          <section className="">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white font-Salsa sm:text-4xl">
                  Registration For Latest Events
                </h2>

                <p className="mt-4 text-slate-500 sm:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione dolores laborum labore provident impedit esse
                  recusandae facere libero harum sequi.
                </p>
              </div>

              <div className="mt-8 sm:mt-12">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
                  <div className="flex flex-col px-4 py-8 text-center border-r-gray-100   rounded-full">
                    <div className="terminal-loader">
                      <div className="terminal-header">
                        <div className="terminal-title"> Total Events</div>
                        <div className="terminal-controls">
                          <div className="control close" />
                          <div className="control minimize" />
                          <div className="control maximize" />
                        </div>
                      </div>
                      <div className="content">
                        <div className="text">Total {totalProducts}.... </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col px-4 py-8 text-center  rounded-full ">
                
                    <div className="terminal-loader">
                      <div className="terminal-header">
                        <div className="terminal-title"> Events OnSale</div>
                        <div className="terminal-controls">
                          <div className="control close" />
                          <div className="control minimize" />
                          <div className="control maximize" />
                        </div>
                      </div>
                      <div className="content">
                        <div className="text">Total {totalProductsOnSale}..... </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col px-4 py-8 text-center rounded-full ">
                  <div className="terminal-loader">
                      <div className="terminal-header">
                        <div className="terminal-title"> Tech Events </div>
                        <div className="terminal-controls">
                          <div className="control close" />
                          <div className="control minimize" />
                          <div className="control maximize" />
                        </div>
                      </div>
                      <div className="content">
                        <div className="text">Total {tech}.... </div>
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
        <CommonListing
          data={allProducts && allProducts.data}
          st={false}
          ad={false}
        />
      </div>
    </>
  );
}
