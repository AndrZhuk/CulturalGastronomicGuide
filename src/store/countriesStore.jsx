import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const useCountriesStore = create((set, get) => ({
  countries: [],
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  fetchCountries: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/countries`
      );
      set({ countries: response.data });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },

  fetchDishesByCountry: async (countryName) => {
    try {
      const lowerCaseCountryName = countryName.toLowerCase();
      const response = await axios.get(
        `${API_URL}/api/dishes/${lowerCaseCountryName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dishes:", error);
      return [];
    }
  },
}));
