"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import QrReader from "react-qr-scanner";

import AdminLayout from "@/components/AdminLayout.js/page";

export default function OrderDetails() {
  const { orderDetails, setOrderDetails, user } = useContext(GlobalContext);

  const params = useParams();
  const router = useRouter();
  const [scannedData, setScannedData] = useState("");
  const qrRef = useRef(null);

  const handleScan = async (data) => {
    console.log("Scanned data:", data);

    if (data) {
      setScannedData(data.text);

      try {
        // Log the data before calling getOrderDetails
        console.log("Data before calling getOrderDetails:", data.text);

        const res = await getOrderDetails(data.text);

        if (res.success) {
          setOrderDetails(res.data);
          console.log("Order details:", res.data);
        } else {
          console.error("Failed to get order details:", res.error);
        }
      } catch (error) {
        console.error("Error while fetching order details:", error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const renderQRCodeSection = () => {
    return (
      <div className="h-32 rounded-lg bg-gray-200">
        {scannedData ? (
          <div>
            <img src="/giphy.gif" width="100%" alt="Scanned QR Code" />
          </div>
        ) : (
          <QrReader
            ref={qrRef}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        )}
      </div>
    );
  };

  return (
    <AdminLayout isSidebarFixed={true} fl={false}>
    <section className="m-9 overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
    
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <div
            className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
            aria-modal="true"
            role="dialog"
            tabIndex="-1"
          >
            <div className="mt-4 space-y-6">
              <ul className="grid grid-cols-2 gap-4">
                {orderDetails &&
                orderDetails.orderItems &&
                orderDetails.orderItems.length
                  ? orderDetails.orderItems.map((item) => (
                      <li key={item._id} className="flex items-center gap-4">
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {item.product.name}
                          </h3>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>

              <div className="space-y-4 text-center">
                <a
                  href=""
                  className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                >
                  Order #{orderDetails && orderDetails._id}
                </a>

                <a
                  href=""
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  {orderDetails ? "Verified" : "No Bookings"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-2 font-Lemon font-bold text-2xl p-2 border text-gray-600">
        <h1>Scan QR Code</h1>
        {renderQRCodeSection()}
      </div>
    </section>
  </AdminLayout>
  )  
}
