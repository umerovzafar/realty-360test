import axios from "axios";

import { create } from "zustand";
import { EstateData, RealEstate } from "../_types";



const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type RealEstateStore = {
  realEstate: RealEstate[] | null;
  estate: RealEstate | null;
  estateData: EstateData | null,
  fetchRealEstate: () => Promise<void>;
  fetchEstate: (id: number) => Promise<void>;
  addEstate: (newEstate: Omit<RealEstate, "id" | "images">) => Promise<void>;
  getParamsData: () => Promise<void>,
  updateEstate: (
    id: number,
    updatedEstate: Omit<RealEstate, "id" | "images">,
  ) => Promise<void>;
  deleteEstate: (id: number) => Promise<void>;
};

export const useRealEstate = create<RealEstateStore>((set) => ({
  realEstate: null,
  estate: null,
  estateData: null,
  fetchRealEstate: async () => {
    try {
      const response = await axiosInstance.get("/real-estate");

      set({ realEstate: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  getParamsData: async () => {
    try {
      const response = await axiosInstance.get("/objects");

      set({ estateData: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchEstate: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/real-estate/${id}`);

      set({ estate: null });
      set({ estate: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addEstate: async (newEstate: Omit<RealEstate, "id" | "images">) => {
    try {
      const response = await axiosInstance.post("/real-estate", newEstate);

      

      set((state) => ({
        realEstate: [...(state.realEstate || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateEstate: async (
    id: number,
    updatedEstate: Omit<RealEstate, "id" | "images">,
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/real-estate/${id}`,
        updatedEstate,
      );

      set((state) => ({
        realEstate: state.realEstate?.map((estate) =>
          estate.id === id ? response.data : estate,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteEstate: async (id: number) => {
    try {
      await axiosInstance.delete(`/real-estate/${id}`);

      set((state) => ({
        realEstate: state.realEstate?.filter((estate) => estate.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
