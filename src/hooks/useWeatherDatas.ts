import { useState } from "react";
import axios from "axios";
import type { weatherDatas } from "../types/main";

export const useWeatherDatas = () => {
  const [weather, setWeather] = useState<weatherDatas | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeatherDatas = async (cityName:string) => {
    setError(null);
    setWeather(null);
    const weatherApi = import.meta.env.VITE_WEATHER_API_KEY;

    if (!cityName) {
      setError("Sorry, the city name must fulfilled!");
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApi}&units=metric&lang=id`
      );
      const data = res.data;
      setWeather(data);
      console.log(weather)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };
  return { getWeatherDatas, weather, error};
};
