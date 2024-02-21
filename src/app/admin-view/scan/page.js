"use client";

import Grid from "@mui/material/Unstable_Grid2";
import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import QrReader from "react-qr-scanner";

import { CircularProgress } from "@material-ui/core";
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
    <AdminLayout>
      <Grid container spacing={2} columns={16}>
        <Grid xs={8}>
          <div className="text-center mt-2 font-Lemon font-bold text-2xl p-2 border text-gray-600">
            <h1>Scan QR Code</h1>
            {renderQRCodeSection()}
          </div>
        </Grid>
        <Grid xs={8}>
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
        </Grid>
      </Grid>

      <svg
        className="wave-bokkings"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#F56715"
          fill-opacity="1"
          d="M0,192L26.7,165.3C53.3,139,107,85,160,64C213.3,43,267,53,320,53.3C373.3,53,427,43,480,74.7C533.3,107,587,181,640,186.7C693.3,192,747,128,800,85.3C853.3,43,907,21,960,42.7C1013.3,64,1067,128,1120,133.3C1173.3,139,1227,85,1280,64C1333.3,43,1387,53,1413,58.7L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
    </AdminLayout>
  );
}
