import axios from "axios";
import { useEffect, useState } from "react";
import Map from "./Map";

const App = () => {

  const [ipDetails, setIpDetails] = useState([]);

  useEffect(() => {
    getIpDetails()
  }, [])

  const getIpDetails = async () => {
    const response = await axios.get('https://ipapi.co/json/');
    console.log('Api response =>>>', response.data)
    setIpDetails(response.data)
  }

  return (
    <div className="bg-slate-700 md:h-screen">
      {/* Heading */}
      <div className="flex justify-center pt-5">
        <h1 className="text-xl md:text-5xl text-white font-mono font-bold">IP Address Finder</h1>
      </div>

      {/* HR Line */}
      <div>
        <hr className="mt-1"></hr>
      </div>
      {/* location and map */}
      {ipDetails.length != 0 ?
        <div className="flex justify-center items-center mt-5 md:space-x-5 flex-wrap">
          {/* Info */}
          <div className="text-center md:text-start">
            <h1 className="text-white lg:text-4xl font-medium md:py-5">What is my {ipDetails.version} address ? </h1>
            <p className="text-blue-200 font-bold py-3 lg:text-2xl">{ipDetails?.ip}</p>
            <h2 className="text-white lg:text-2xl font-medium md:py-5">Approximate location : </h2>
            <p className="text-blue-200 font-bold py-3">{ipDetails?.country_name}, {ipDetails.region}, {ipDetails.city}</p>
            <h2 className="text-white lg:text-2xl font-medium md:py-5">Internet Service Provider (ISP) : </h2>
            <p className="text-blue-200 font-bold py-3">{ipDetails?.org}</p>
          </div>
          {/* Map*/}
          <div className="w-80 md:w-[50%]">
            <Map latitude={ipDetails.latitude} longitude={ipDetails.longitude} />
          </div>
        </div>
        :
        <div className="h-screen flex justify-center text-white font-bold text-2xl items-center">Loading ......</div>
      }
    </div>
  )
}

export default App;
