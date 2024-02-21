"use client";

import { Fragment } from "react";

import Cookies from "js-cookie";
import About from "@/components/About";
import Explore from "@/components/Explore";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  slideIn,
  staggerContainer,
  textVariant,
  navVariants,
} from "@/utils/motion";
// import GifPlayer from "react-gif-player";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const pathName = usePathname();
  const router = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true });

  // useEffect(() => {
  //   const hasVisitedBefore = sessionStorage.getItem("arcadeLoader");

  //   if (hasVisitedBefore === "false") {
  //     setIsLoading(false);
  //   } else {
  //     const loadingTimeout = setTimeout(() => {
  //       setIsLoading(false);
  //       if (landingContainer.current) {
  //         (landingContainer.current as HTMLElement).style.pointerEvents = "none";
  //       }
  //       sessionStorage.setItem("arcadeLoader", "false");
  //     }, 1000);

  //     return () => clearTimeout(loadingTimeout);
  //   }
  // }, []);
  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);



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
      {isLoading ? (
        // Display the loading GIF or animation
        <div>loading</div>
      ) : (
   
      <div className="bg-gray-800 overflow-hidden">
        <div>
          <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className="sm:px-16 px-6 py-8 relative"
          >
            <div className="absolute w-[50%] inset-0 gradient-01 sm:flex sm:flex-col" />
            <div className="2xl:max-w-[1280px] w-full x-auto flex  justify-between gap-8">
              <div>
                {" "}
                <h2 className="  font-Rubik font-extrabold text-[39px] leading-[30.24px] text-white">
                  INCRIDEA
                </h2>
              </div>

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
                            "mt-1.5 inline-block text-white font-Lemon border border-white  px-5 py-3 text-xs font-medium uppercase tracking-wide"
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
                          "mt-1.5 inline-block text-white font-Lemon border border-white   px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        }
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push("/login")}
                        className={
                          "mt-1.5 inline-block  text-white font-Lemon border border-white  px-5 py-3 text-xs font-medium uppercase tracking-wide "
                        }
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        </div>
        <div className=" ">
          <section className=" sm:py-16 xs:py-8 py-12 sm:pl-16 pl-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
            >
              <div className=" text-white flex justify-center items-center flex-col relative z-10">
                <motion.h1
                  variants={textVariant(1.1)}
                  className="font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white"
                >
                  MULTIVERS
                </motion.h1>
                <motion.div
                  variants={textVariant(1.2)}
                  className=" flex flex-row justify-center items-center"
                >
                  <h1 className="font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white">
                    Ma
                  </h1>
                  <div className="md:w-[212px] sm:w-[80px] w-[60px] md:h-[108px] sm:h-[48px] h-[38px] md:border-[18px] border-[9px] rounded-r-[50px] border-white sm:mx-2 mx-[6px]" />
                  <h1 className="font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white">
                    Ness
                  </h1>
                </motion.div>
              </div>

              <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className="relative w-full md:-mt-[20px] -mt-[12px]"
              >
                <div className="absolute  w-full h-[300px] rounded-tl-[140px] z-[0] -top-[30px]" />

                <img
                  src="/cover.png"
                  alt="hero_cover"
                  className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
                />

                <a href="#explore">
                  <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
                    <img
                      src="/stamp.png"
                      alt="stamp"
                      className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
                    />
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </section>
        </div>
        {/* //------------------------------ */}
        <div className="relative About">
          <About />
          <div className="gradient-03 z-0" />
          <Explore />
        </div>
     
      </div>
      )}
    </>
  );
}
