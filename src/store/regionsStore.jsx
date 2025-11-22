import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useRegionsStore = create((set) => ({
  regions: [],
  selectedRegion: null,

  fetchRegions: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/regions`
      );
      set({ regions: response.data });
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  },

  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));
