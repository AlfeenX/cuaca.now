import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = ({ onSearch }: { onSearch: (cityName: string) => void }) => {
    const [cityName, setCityName] = useState("")
  return (
    <div className="w-full flex items-center justify-evenly h-[64px] shadow-md bg-white z-100">
      <h1 className="font-open text-blue-950 font-bold text-xl">Cuaca.now</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          placeholder="Type Your City..."
          onKeyDown={(e)=> {
            if(e.key === "Enter"){
                onSearch(cityName)
                setCityName("")
            }
          }}
          className="border-2 rounded-3xl px-2 py-1 border-blue-400"
        />
        <button
          onClick={() => {
            onSearch(cityName);
          }}
          className="bg-blue-400 p-2 rounded-2xl"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
