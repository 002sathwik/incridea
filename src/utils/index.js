export const adminNavOptions = [
 
];
export const SideNavOptions = [
  {
    id: "Notification",
    label: "Notification",
    path: "/admin-view",
  },
  {
    id: "Manage-events",
    label: "Manage Events",
    path: "/admin-view/all-products",
  },
  {
    id: "Add-events",
    label: "Add Event",
    path: "/admin-view/add-product",
  },
  {
    id: "adminNewEvent",
    label: "Scan Ticket",
    path: "/admin-view/scan",
  },
  {
    id: "User Chart",
    label: "User Chart",
    path: "/admin-view/userchart",
  },
  {
    id: "Product Chart",
    label: "Product Chart",
    path: "/admin-view/productchart",
  },
  {
    id: "Orders Chart",
    label: "Booking Chart",
    path: "/admin-view/orderschart",
  },
];
export const navOptions = [
  {
    id: "UserEvent",
    label: " AllEvents",
    path:"/product/listing/all-products",
  },
  {
    id: "about",
    label: "about",
    path: "/",
  },
  {
    id: "tech",
    label: "tech",
    path: "/",
  },

];

export const st = {
  btn: " text-black bg-white hover:bg-gray-400 focus:ring-4 focus:ring-blue-300  font-Pacifico rounded-lg text-sm px-4 py-2.5 me-2 mb-1 md:mb-2 ",
};

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your  Email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "Role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "admin",
      },
      {
        id: "student",
        label: "student",
      },
    ],
  },
];
export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter Name",
    label: "Event Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter Price ",
    label: "Ticket Price",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "tech",
        label: "tech",
      },
      {
        id: "art",
        label: "art",
      },
      {
        id: "cultural",
        label: "cultural",
      },
    ],
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "prize",
    type: "number",
    placeholder: "Enter prize pool",
    label: "Prize Pool",
    componentType: "input",
  },


  {
    id: "venuInfo",
    type: "text",
    placeholder: "Enter Venu",
    label: "Venu Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Drop %",
    label: "Price Drop",
    componentType: "input",
  },
];

export const AvailableSizes = [
  {
    id: "1",
    label: "Day1",
  },
  {
    id: "2",
    label: "Day2",
  },
  {
    id: "3",
    label: "Day3 ",
  },
];
export const firebaseConfig = {
  apiKey: "AIzaSyDX2sbx6CNnpc2yt-Z143mIlqbsuoZcbig",
  authDomain: "incridea-c4031.firebaseapp.com",
  projectId: "incridea-c4031",
  storageBucket: "incridea-c4031.appspot.com",
  messagingSenderId: "742538177143",
  appId: "1:742538177143:web:4fd2c494394d1afee93472",
  measurementId: "G-8SDZNC9YWS"
};

// export const firebaseStorageUrl = "gs://incridea-c4031.appspot.com"
export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];