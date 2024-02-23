"use client";

import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Profile from '@/components/Accounts/profilecard/page';
import Adress from '@/components/Accounts/Adress.js/page';
import { Spinnaker } from 'next/font/google';
import Spinner from '@/components/Spinner/page';

export default function Account() {
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
  const router = useRouter()

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
    <>
    <Navbar/>
    <Box sx={{ width: 1 }} className="mt-27 m-14  ">
    <svg  className="wave-bokkings top-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,160L40,165.3C80,171,160,181,240,165.3C320,149,400,107,480,122.7C560,139,640,213,720,213.3C800,213,880,139,960,106.7C1040,75,1120,85,1200,117.3C1280,149,1360,203,1400,229.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 4 ">
        <div className=' fixed '><Profile  button={true}/></div>
        </Box>
        <Box gridColumn="span 7 ">
        <div className=" mt-29"><Adress/></div>
        </Box>
      </Box>
    </Box>
    </>
  );
}
