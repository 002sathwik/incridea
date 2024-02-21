
export default function InputComponentade({
    label,
 
    onChange,
    value,
    type,
  }) {
 
    return (
      <div className="relative flex flex-row">
        <p className=" text-white font-Lemon pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  rounded-sm">
          {label}
        </p>
        <input
      
          type={type || "text"}
          value={value}
          onChange={onChange}
          className="border  text-white border-white font-Lemon placeholder-gray-200 focus:outline-none  w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-gray-800 rounded-md"
        />
      </div>
    );
  }
  