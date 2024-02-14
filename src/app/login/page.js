"use client";

import InputComponent from "@/components/FormElements/InputComponent";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/componentlevel";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    try {
      setPageLevelLoader(true);
      const res = await login(formData);

      console.log(res);

      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormdata);
        Cookies.set("token", res?.finalData?.token);
        localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setPageLevelLoader(false);
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser, router]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className=" font-Salsa text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get Started
        </h1>

        <p className=" font-Salsa  mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>
        <div className=" mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            {loginFormControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  key={controlItem.id}
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : null
            )}

            <button
              className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
              disabled={!isValidForm()}
              onClick={handleLogin}
            >
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={"Logging In"}
                  color={"#ffffff"}
                  loading={pageLevelLoader}
                />
              ) : (
                "Login"
              )}
            </button>
            <div className="flex flex-col gap-2">
              <p>New to website ?</p>
              <button
                className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
