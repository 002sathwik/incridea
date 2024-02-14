"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CartModal from "../CartModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
// import CommonModal from "../CommonModal";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hiden"
      }`}
      id="nav-items"
    >
      <ul
        className={` sm:text-center flex flex-row p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className=" text-[10px] md:text-[15px] cursor-pointer block py-2 font-Lemon pl-3 pr-4 text-gray-500 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 font-Lemon pr-4 text-gray-500 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  // const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className=" border-black bg-lime-50 fixed w-full z-20 top-0 left-0 border-b ">
        <div className="  bg-teal-50 mx-auto max-w-screen-xl px-4 py-2 sm:px-6 sm:py-6 lg:px-6 border border-b">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <a href="/">
                <h1 className=" cursor-pointer mt-2 font-Rubik text-4xl font-bold text-gray-900 sm:text-5xl">
                  Incridea!
                </h1>
              </a>

              <p className="  font-Lemon mt-1.5 text-sm text-gray-500">
                Let's explore new{" "}
                <spam className="text-black font-Bungee">Event</spam> post! 🎉
              </p>
            </div>
            <NavItems router={router} isAdminView={isAdminView} />
            <div className="mt-2 flex flex-col gap-4 sm:mt-0 sm:flex-col sm:items-center">
              {/* Buttons Div */}
              <div className="flex md:flex-row sm:flex-row gap-4 sm:flex-wrap justify-center">
                {!isAdminView && isAuthUser ? (
                  <Fragment>
                    <div className="flex flex-col md:flex-row gap-4">
                      <button
                        className={
                          "mt-1.5 font-Lemon inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                        }
                        onClick={() => router.push("/account")}
                      >
                        Account
                      </button>
                      <button
                        className={
                          "mt-1.5 font-Lemon inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                        }
                        onClick={() => setShowCartModal(true)}
                      >
                        Wallet
                      </button>
                    </div>
                  </Fragment>
                ) : null}
                <div className="flex flex-row md:flex-row gap-4">
                  {user?.role === "admin" ? (
                    isAdminView ? (
                      <button
                        className={
                          "mt-1.5 inline-block font-Lemon bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                        }
                        onClick={() => router.push("/")}
                      >
                        Client View
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push("/admin-view")}
                        className={
                          "mt-1.5 inline-block text-black font-Lemon border border-black  px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        }
                      >
                        Admin View
                      </button>
                    )
                  ) : null}

                  {isAuthUser ? (
                    <button
                      onClick={handleLogout}
                      className={
                        "mt-1.5 inline-block text-black font-Lemon border border-black  px-5 py-3 text-xs font-medium uppercase tracking-wide"
                      }
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/login")}
                      className={
                        "mt-1.5 inline-block  text-black font-Lemon border border-black px-5 py-3 text-xs font-medium uppercase tracking-wide "
                      }
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showCartModal && <CartModal />}
    </>
  );
}
