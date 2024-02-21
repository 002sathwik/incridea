import AdminLayout from "@/components/AdminLayout.js/page";
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();

  return (
    <AdminLayout>
      
       <div className="ml-9">
        <CommonListing data={allAdminProducts && allAdminProducts.data} st={true} ad={true} />
      </div>
      <svg className="wave-bokkings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#951874" fill-opacity="1" d="M0,288L80,288C160,288,320,288,480,245.3C640,203,800,117,960,96C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </AdminLayout>
  );
}
