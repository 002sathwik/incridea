import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";
import Navbar from "@/components/Navbar";
export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData);

  return (
    <>
      <Navbar />
      <CommonDetails item={productDetailsData && productDetailsData.data} />
    </>
  );
}
