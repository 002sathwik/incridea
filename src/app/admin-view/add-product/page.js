"use client";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
const firebaseStroageURL = "gs://incridea-c4031.appspot.com"
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
 } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext,useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
// import { format } from "date-fns";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addNewProduct,updateAProduct  } from "@/services/product";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout.js/page";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const initialFormData = {
  name: "",
  price: 0,
  description: "",
 
  venuInfo: "",
  prize: "",
  onSale: "no",
  imageUrl: "",
  types: [],
  priceDrop: 0,
};

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);
 
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  
  } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);
  // --------------------------------------------------------------------------------------------------------------------------------
  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.types];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      types: cpySizes,
    });
  }
  // ------------------------------------------------------------------------------------------------------------------
  const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
  };
  // ---------------------------------------------------------------------------------------------
  async function helperForUPloadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `incridea/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }
  // ---------------------------------------------------------------------
  async function handleImage(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );

    console.log(extractImageUrl);
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }
  console.log(formData);
  const [selectedDate, setSelectedDate] = useState(null);
  // -------------------------------------------------------------------------------------------------------------
   async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null)
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  return (
    <AdminLayout isSidebarFixed={false} fl={true}>
    <section className=" md:mt-12 mt-[170px] min-h-screen flex items-center justify-center">
      <div className="max-w-full sm:max-w-xl lg:max-w-3xl text-center">
        <div className="  text-2xl bg-gray-50 md:text-3xl font-bold font-Lemon border border-orange-500 p-2">
          <h1>{currentUpdatedProduct !== null ? 'Update Event Details ' : "Add New Event"}</h1>
        </div>

        <div className="m-5 text-center items-center">
          <input
            className="ml-6 font-Lemon"
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="ml-5 flex gap-2 flex-row font-Lemon">
            <TileComponent
              selected={formData.types}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>

          <div className="ml-4 mx-auto mb-0 mt-8 max-w-sm space-y-4">
          
          
            {adminAddProductformControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  className=""
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id] }
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  label={controlItem.label}
                  options={controlItem.options}
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
              onClick={handleAddProduct}
              className="font-Lemon inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
               {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={currentUpdatedProduct !== null ? 'Updating Event' : "Adding Event"}
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Event"
            ) : (
              "Add Event"
            )}
            </button>
          </div>
        </div>
        <Notification />
      </div>
    </section>
    </AdminLayout>
  );
}
