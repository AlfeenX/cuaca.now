import { useEffect } from "react";
import { useWeatherDatas } from "../hooks/useWeatherDatas";
import {
  FaCloudSun,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaWind,
} from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { PiThermometerHotThin } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { WiBarometer } from "react-icons/wi";
import NoInputError from "./NoInputError";
import NotFoundError from "./NotFoundError";

const Main = ({ cityName }: { cityName: string }) => {
  const { weather,error,  getWeatherDatas } = useWeatherDatas();

  useEffect(() => {
    if (cityName) {
      getWeatherDatas(cityName);
    }
  }, [cityName]);

  const degress = weather?.wind.deg;

  let windDirection = "";
  if (degress !== undefined) {
    if (degress >= 45 && degress < 135) {
      windDirection = "Timur";
    } else if (degress >= 135 && degress < 225) {
      windDirection = "Selatan";
    } else if (degress >= 225 && degress < 315) {
      windDirection = "Barat";
    } else {
      windDirection = "Utara";
    }
  }
  const dt = weather?.dt;
  const timezone = weather?.timezone;
  const date =
    dt !== undefined && timezone !== undefined
      ? new Date((dt + timezone) * 1000)
      : undefined;

  const tanggal = date
    ? date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "--";

  const hari = date
    ? date.toLocaleDateString("id-ID", {
        weekday: "long",
      })
    : "--";
  const jam = date ? date.getUTCHours().toString().padStart(2, "0") : "--";
  const menit = date ? date.getUTCMinutes().toString().padStart(2, "0") : "--";

  return (
    <>
      {weather ? (
        <div className="absolute w-full h-full flex items-center pt-[64px] flex-wrap text-gray-900">
      <div className="md:w-[30vw] w-full h-full shadow-2xl flex items-center justify-evenly flex-col z-50">
        {weather?.weather[0].icon ? (
          <img
            className="w-[150px]"
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          />
        ) : (
          <FaCloudSun className="text-[100px]" />
        )}
        <div className="text-center text-2xl">
          <h3 className="text-[65px] font-nunito m-0 p-0">
            {weather?.main.temp !== undefined
              ? weather.main.temp.toFixed()
              : "--"}
            °C
          </h3>
          <p className="m-0 text-[18px] capitalize pb-6 border-b-2 border-gray-500/40 w-full">
            {weather?.weather[0].description || "Cloudy"}
          </p>
        </div>
        <div className="text-center">
          <p>{tanggal}</p>
          <p>
            {hari}, {jam}.{menit}
          </p>
        </div>
        <h1 className="text-3xl font-nunito capitalize">
          {weather?.name || "--"}
        </h1>
      </div>
      <div className="w-full md:w-[70vw] p-10 h-full flex flex-col justify-between bg-linear-to-l/oklch from-blue-700 to-blue-300">
        <div className="grid grid-cols-3 gap-6 items-center place-items-center w-full h-full p-4 font-nunito text-white">
          <div className="w-full h-full rounded-2xl flex flex-col pt-6 gap-4 px-4 border-2">
            <div className="flex h-4 gap-2 items-center">
              <FaWind />
              <p className="card-title">Angin</p>
            </div>
            <p className="text-4xl">{weather?.wind.speed}KM/H</p>
            <p className="card-title">{windDirection}</p>
          </div>
          <div className="w-full h-full rounded-2xl flex flex-col pt-6 gap-4 px-4 border-2">
            <div className="flex items-center gap-2 h-4">
              <IoWaterOutline />
              <p className="card-title">Kelembaban</p>
            </div>
            <p className="text-4xl">{weather?.main.humidity}%</p>
          </div>
          <div className="w-full h-full rounded-2xl flex flex-col pt-6 gap-4 px-4 border-2">
            <div className="flex gap-2 h-4 items-center">
              <PiThermometerHotThin />
              <p className="card-title">Terasa Seperti</p>
            </div>
            <p className="text-4xl">{weather?.main.feels_like.toFixed()}°C</p>
          </div>
          <div className="w-full h-full rounded-2xl flex flex-col pt-6 gap-4 px-4 border-2">
            <div className="flex gap-2 h-4 items-center">
              <SlGraph />
              <p className="card-title">Riwayat Suhu</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaLongArrowAltUp className="text-green-600" />
              <p className="text-3xl">{weather?.main.temp_max?.toFixed(1)}°C</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaLongArrowAltDown className="text-red-600" />
              <p className="text-3xl">
                {weather?.main.temp_min?.toFixed(1)}
                °C
              </p>
            </div>
          </div>
          <div className="w-full h-full rounded-2xl flex flex-col pt-6 gap-4 px-4 border-2">
            <div className="flex gap-2 h-4 items-center">
              <WiBarometer />
              <p className="card-title">Tekanan</p>
            </div>
            <p className="text-4xl">{weather?.main.pressure}mb</p>
          </div>
        </div>
        <p className="text-nunito text-gray-600 text-sm text-center">
          Data by Open Weather
        </p>
      </div>
    </div>
      ): error ? (
        <NotFoundError error={error}/>
      ): (
        <NoInputError/>
      )}
    </>
  );
};

export default Main;
