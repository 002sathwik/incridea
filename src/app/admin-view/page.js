"use client";

// import { Bar, Chart } from 'react-chartjs-2';
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";

import { useContext, useEffect } from "react";

import { PulseLoader } from "react-spinners";
import AdminLayout from "@/components/AdminLayout.js/page";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(res.data && res.data.length ? res.data : []);
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    extractAllOrdersForAllUsers();
  }, []);

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAllUsers();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

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
    <AdminLayout isSidebarFixed={false} fl={true}>
      <div class="grid grid-rows-3 grid-flow-col gap-2 h-screen mx-auto">
        <div class="row-span-2 col-span-2 ...">
          <div className=" ">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 md:mt-5">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                allOrdersForAllUsers.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                  >
                    <div className="flex items-center justify-center">
                      <h1 className="font-bold text-lg mb-3">
                        #order: {item._id}
                      </h1>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-3 text-sm font-medium text-gray-900">
                        User Name:
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {item?.user?.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-3 text-sm font-medium text-gray-900">
                        User Email:
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {item?.user?.email}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-3 text-sm font-medium text-gray-900">
                        Total Paid Amount:
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${item?.totalPrice}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {item.orderItems.map((orderItem, index) => (
                        <div key={index} className="shrink-0">
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
                      ))}
                    </div>
                    <div className="flex gap-5">
                    
                    </div>
                  </div>
                ))
              ) : (
                <div>No orders available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
