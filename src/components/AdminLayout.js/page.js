"use client";
import { SideNavOptions } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const AdminLayout = ({ children, }) => {
  const pathName = usePathname();
  const router = useRouter();
 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className=" fixed row-span-3  border-e-black  ">
            <div className="">
              <div className="fixed flex h-screen flex-col justify-between border-e border-black sidebar-bg">
                <div className="px-4 py-6 ">
                  <div className="text-white text-[38px] font-Rubik text-center ml-1 ">
                    <spam className="font-Rubik">Incridea!🌟 </spam>
                  </div>
                  <span className=" mt-2 p-2 font-Salsa   border border-black ml-2  text-white grid place-content-center rounded-lg font-bold text-sm">
                    Admin DashBoard 📝
                  </span>

                  <ul className="mt-7 space-y-1">
                    {SideNavOptions
                      ? SideNavOptions.map((item) => (
                          <li
                            className="block font-Lemon   cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white"
                            key={item.id}
                            onClick={() => router.push(item.path)}
                          >
                            {" "}
                            <div className="flex flex-row">
                              <div className="w-6">
                                <img src="/bl.png" />
                              </div>
                              <div className="ml-2">{item.label}</div>
                            </div>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white p-2 hover:bg-gray-50"
                  >
                    <div className="flex flex-row items-center">
                      <div className="w-12">
                        <img src="/customer.png" />
                      </div>

                      <div className="ml-2">
                        <button
                          className="mt-1.5 inline-block font-Lemon bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                          onClick={() => router.push("/")}
                          variant="contained"
                        >
                          Client View
                        </button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="m-5 ">{children}</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
