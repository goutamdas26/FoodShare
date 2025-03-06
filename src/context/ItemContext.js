// src/context/ItemsContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [donatedFood, setDonatedFood] = useState([]);
  const [claimedFood, setClaimedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = Constants.expoConfig.extra.API_URL;

  // Fetch available items
  const fetchItems = async () => {
    try {

      setLoading(true);
      const response = await axios.get(`${API_URL}/api/food/available`);
      
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch donated food
  const fetchDonatedFood = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (!userToken) {
        
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/food/getDonatedFood`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      setDonatedFood(response.data || []);
  
    } catch (error) {
      console.error("Error fetching donated food:", error);
    }
  };

  // Fetch claimed food
  const fetchClaimedFood = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (!userToken) {
        
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/food/getClaimedFood`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      setClaimedFood(response.data || []);
     
    } catch (error) {
      console.error("Error fetching claimed food:", error);
    }
  };

  // Fetch data when the provider is mounted
  useEffect(() => {
    fetchItems();
    fetchClaimedFood();
    fetchDonatedFood();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        items,
        donatedFood,
        claimedFood,
        loading,
        fetchItems,
        fetchDonatedFood,
        fetchClaimedFood,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
