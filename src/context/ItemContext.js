// src/context/ItemsContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = Constants.expoConfig.extra.API_URL;
 
  // Fetch items from the backend
  const fetchItems = async () => {
    try {
     
      setLoading(true);
      const response = await axios.get(API_URL+"/api/food/available"
      );
      setItems(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };



  const addItem = async (newItem) => {
    try {
      const response = await axios.post("http://YOUR_API_URL/items", newItem);
      setItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an item
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`http://YOUR_API_URL/items/${id}`, updatedItem);
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://YOUR_API_URL/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
  

    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateItem,
        deleteItem,
        fetchItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
