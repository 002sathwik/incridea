import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();

  return (
    <div>
      <div className="bg-indigo-600 px-4 py-3 text-white mt-8">
        <p className="text-center text-sm font-medium  font-Salsa">
          Love  Tech and art ?
          <a href="#" className="inline-block underline">
            Check out this new Events!
          </a>
        </p>
      </div>
      <CommonListing data={getAllProducts && getAllProducts.data} st={false} />
    </div>
  );
}
