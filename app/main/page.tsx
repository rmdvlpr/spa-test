"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/library/hooks";
import {
  fetchAllCountries,
  setSelectedCountry,
  setSelectedState,
} from "@/library/features/CountriesSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { countries, selectedCountry, selectedState } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const selectedCountryData = countries.find(
    (country) => country.code === selectedCountry
  );

  console.log(
    selectedCountryData?.code && selectedCountryData.name,
    "selected Country"
  );

  const selectedStateData = selectedCountryData?.states.find(
    (state) => state.code === selectedState
  );

  console.log(
    selectedStateData?.code && selectedStateData.name,
    "selected City"
  );

  //! Here is to Calculate total population for selectedStateData
  const totalPopulationData =
    selectedStateData?.cities.reduce((sum, city) => sum + city.population, 0) ||
    0;
  return (
    <div className="p-8 max-6xl mx-auto">
      <div className="flex flex-col items-center mb-8 flex-wrap px-4">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Countries and Cities
        </h1>

        {/* Select Country and  State */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto justify-center">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="mb-1 text-sm font-medium">Country:</label>
            <select
              value={selectedCountry || ""}
              onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="mb-1 text-sm font-medium">State:</label>
            <select
              value={selectedState || ""}
              onChange={(e) => dispatch(setSelectedState(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select a state</option>
              {selectedCountryData?.states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Total Citizen */}
      {selectedStateData && (
        <div className="text-center mb-8">
          <h2 className=" font-semibold text-2xl">
            Total Citizens: {totalPopulationData.toLocaleString()}
          </h2>
        </div>
      )}

      {/* Cities */}
      {selectedStateData && (
        <div>
          <h3 className="font-semibold mb-4 text-5xl">Cities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {selectedStateData.cities.map((city) => (
              <div
                key={city.name}
                className="border flex flex-col gap-5 items-center justify-center border-gray-300 rounded-md p-10"
              >
                <h4 className="font-semibold text-2xl">{city.name}</h4>
                <p className="font-medium italic">
                  Citizens: {city.population.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
