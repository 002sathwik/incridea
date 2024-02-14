import AdminLayout from "@/components/AdminLayout.js/page";
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();

  return (
    <AdminLayout isSidebarFixed={false} fl={true}>
      
       <div className="ml-9">
        <CommonListing data={allAdminProducts && allAdminProducts.data} st={true} />
      </div>
    </AdminLayout>
  );
}
