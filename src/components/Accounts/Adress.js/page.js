
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputComponentade from '@/components/Accounts/AdressForm/page';

export default function Adress() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter();
 
  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }
  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }
  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);


  
  return (
    <div className="mt-16">
      <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-medium text-white">Bookings Details</h3>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300">
                    {" "}
                    Adress{" "}
                  </a>
                </li>

                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300">
                    {" "}
                    Number{" "}
                  </a>
                </li>

                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300">
                    More
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <div className="  mt-4 flex md:flex-row gap-4">
              {addresses && addresses.length ? (
                addresses.map((item) => (
                  <div className="border bg-gray-100  rounded-md p-6 " key={item._id}>
                    <p>Name : {item.fullName}</p>
                    <p>Address : {item.address}</p>
                    <p>City : {item.city}</p>
                    <p>Country : {item.country}</p>
                    <p>PostalCode : {item.postalCode}</p>
                    <button
                      onClick={() => handleUpdateAddress(item)}
                      className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === item._id ? (
                        <ComponentLevelLoader
                          text={"Deleting"}
                          color={"#ffffff"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p>No address found ! Please add a new address below</p>
              )}
            </div>
          </li>

          <li>
            <a
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
            >
              <div className="">
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className=" inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                  {showAddressForm ? "Hide Address Form" : "Add New Address"}
                </button>

                {showAddressForm && (
                  <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                      {addNewAddressFormControls.map((controlItem) => (
                        <InputComponentade
                          key={controlItem.id} // Add a key prop to each child in the array
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          value={addressFormData[controlItem.id]}
                          onChange={(event) =>
                            setAddressFormData({
                              ...addressFormData,
                              [controlItem.id]: event.target.value,
                            })
                          }
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleAddOrUpdateAddress}
                      className="mt-1 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      {componentLevelLoader && componentLevelLoader.loading ? (
                        <ComponentLevelLoader
                          text={"Saving"}
                          color={"#ffffff"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}
