"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [load, setload] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const { isAuthUser } = useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    try {
      setload(true);

      const data = await registerNewUser(formData);

      if (data.success) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsRegistered(true);
        setFormData(initialFormData);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      // Ensure that the loader is always set to false, even in case of an error
      setload(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser, router]);

  return (
    <div className="wave-bg">
  
    <div className=" mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8  ">
      <div className="mx-auto max-w-lg ">
        <div className=" m-2 md:p-4 ">
          <h1 className=" font-Salsa text-center text-2xl font-bold text-white sm:text-3xl">
            Sign Up To Register 🔐
          </h1>
          <p className=" font-Salsa mx-auto mt-4 max-w-md text-center text-gray-500">
          Unlock exclusive benefits by joining our community! Register now to access a world of opportunities 
          </p>{" "}
        </div>

        <p className="w-full text-4xl font-medium text-center font-serif">
          {isRegistered ? "Registration Successfull !" : null}
        </p>
        {isRegistered ? (
          <button
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <div className=" border border-black bg-white mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <div className="w-full   mt-6 mr-0 mb-0 ml-0 relative space-y-8">
              {registrationFormControls.map((controlItem, index) =>
                controlItem.componentType === "input" ? (
                  <InputComponent
                    key={index}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                    value={formData[controlItem.id]}
                  />
                ) : controlItem.componentType === "select" ? (
                  <SelectComponent
                    key={index}
                    options={controlItem.options}
                    label={controlItem.label}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                    value={formData[controlItem.id]}
                  />
                ) : null
              )}
              <button
                className=" font-Salsa disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
               text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                disabled={!isFormValid()}
                onClick={handleRegisterOnSubmit}
              >
                {load ? <CircularProgress color="inherit" /> : "Register"}
              </button>
              <button
                 onClick={() => router.push("/login")}
                className=" font-Salsa disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
               text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
               
              >
               Already Registered
              </button>

            </div>
          </div>
        )}
      </div>
      <Notification />
    </div>
    </div>
  );
}
