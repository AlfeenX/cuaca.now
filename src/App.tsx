import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { useState } from "react";


function App() {
  const [city, setCity] = useState<string>("")
  return (
    <div className="flex min-h-screen w-full items-center flex-col p-0 m-0">
      {/* Navbar */}
      <Navbar onSearch={setCity} />
      <Main cityName={city}/>
    </div>
  );
}

export default App;
