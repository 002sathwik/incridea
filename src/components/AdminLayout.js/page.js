"use client";
import { SideNavOptions } from "@/utils";
import { usePathname, useRouter } from "next/navigation";

const AdminLayout = ({ children, isSidebarFixed, fl }) => {
  const pathName = usePathname();
  const router = useRouter();
  const fll = fl
    ? "fixed flex h-screen flex-col justify-between border-e border-black  bg-white"
    : "flex h-screen flex-col justify-between border-e border-black  bg-white";
  const layoutClassName = isSidebarFixed
    ? "grid grid-rows-3 grid-flow-col gap-4 fixed"
    : "grid grid-rows-3 grid-flow-col gap-4";
  return (
    <div className={layoutClassName}>
      <div className="row-span-3  border-e-black ">
        <div className="md:mt-7 bg-gray-100">
          <div className={fll}>
            <div className="px-4 py-6">
              <span className=" p-2  bg-gray-100 border border-black ml-2 text-center font-Bungee text-black grid place-content-center rounded-lg font-bold text-2xl">
                Admin Pannel
              </span>

              <ul className="mt-6 space-y-1">
                {SideNavOptions
                  ? SideNavOptions.map((item) => (
                      <li
                        className="block font-Lemon  border border-black cursor-pointer rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-black"
                        key={item.id}
                        onClick={() => router.push(item.path)}
                      >
                        {item.label}
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <a
                href="#"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
              >
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">AdminUser</strong>

                    <span> Admin@gmail.com </span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row-span-3 col-span-2 ">
        <div className="m-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
