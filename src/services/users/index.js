import Cookies from "js-cookie";
export const getAllUsers = async () => {
  try {
    const token = Cookies.get("token");
   
    const res = await fetch(`http://localhost:3000/api/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    
    

    console.log("Fetch Response:", res);

    const data = await res.json();
    console.log("Parsed Data:", data);

    return data;
  } catch (e) {
    console.error(e);
  }
};


