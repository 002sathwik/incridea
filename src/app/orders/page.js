"use client";
import QRCode from "qrcode.react";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Profile from '@/components/Accounts/profilecard/page';
import Box from '@mui/material/Box';

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

  console.log(allOrdersForUser);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: 1 }} className="mt-27 m-14 ">
        <svg
          className="wave-bokkings top-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,160L40,165.3C80,171,160,181,240,165.3C320,149,400,107,480,122.7C560,139,640,213,720,213.3C800,213,880,139,960,106.7C1040,75,1120,85,1200,117.3C1280,149,1360,203,1400,229.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 4 ">
            <div className=" fixed">
              <Profile   button={false}/>
            </div>
          </Box>
          <Box gridColumn="span 7 ">
            <div className=" mt-29">
              <section className="mx-auto px-4 sm:px-6 lg:px-4">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
                  <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                      {allOrdersForUser && allOrdersForUser.length ? (
                        <ul className="flex flex-col gap-4">
                          {allOrdersForUser.map((order) => (
                            <li
                              key={order._id}
                              className="bg-gray-100  shadow  p-5 flex flex-col space-y-3 py-6 text-left"
                            >
                              <div className=" bg-white rounded-xl shadow-xl  border border-black p-2 flex flex-col sm:flex-row sm:items-center">
                                <h1 className="font-bold text-lg mb-3 flex-1 sm:mb-0">
                                  #order: {order._id}
                                </h1>
                                <div className="flex flex-col sm:flex-row items-center sm:ml-4">
                                  <p className="mr-3 text-sm font-medium text-gray-900">
                                    Total paid amount
                                  </p>
                                  <p className="mr-3 text-2xl font-semibold text-gray-900">
                                    ₹{order.totalPrice}
                                  </p>
                                </div>
                              </div>
                              {order.orderItems.map((orderItem, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-2"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="shrink-0">
                                      <img
                                        alt="Order Item"
                                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                                        src={
                                          orderItem &&
                                          orderItem.product &&
                                          orderItem.product.imageUrl
                                        }
                                      />
                                    </div>
                                    <QRCode value={order._id} size={100} />
                                  </div>
                                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <button className="disabled:opacity-50 mt-2 sm:mt-0 sm:mr-2 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                      Send Ticket
                                    </button>
                                    <button
                                      onClick={() =>
                                        router.push(`/orders/${order._id}`)
                                      }
                                      className="inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                    >
                                      View Booking Details
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
                <Notification />
              </section>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
}
