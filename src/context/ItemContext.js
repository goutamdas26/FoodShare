// // src/context/ItemsContext.js
// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";

// export const ItemsContext = createContext();

// export const ItemsProvider = ({ children }) => {
//   const [items, setItems] = useState([]);
//   const [donatedFood, setDonatedFood] = useState([]);
//   const [claimedFood, setClaimedFood] = useState([]);
//   const [loading, setLoading] = useState(true);
// const [user,setUser]=useState({})
//   const API_URL = Constants.expoConfig.extra.API_URL;

//   // Fetch available items
//   const fetchItems = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("userToken");

//       setLoading(true);
//       const response = await axios.post(`${API_URL}/api/food/available`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch donated food
//   const fetchDonatedFood = async () => {
//     try {
//       const userToken = await SecureStore.getItemAsync("userToken");
//       if (!userToken) {
        
//         return;
//       }

//       const response = await axios.post(
//         `${API_URL}/api/food/getDonatedFood`,
//         {},
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );

//       setDonatedFood(response.data || []);
  
//     } catch (error) {
//       console.error("Error fetching donated food:", error);
//     }
//   };

//   // Fetch claimed food
//   const fetchClaimedFood = async () => {
//     try {
//       const userToken = await SecureStore.getItemAsync("userToken");
//       if (!userToken) {
        
//         return;
//       }

//       const response = await axios.post(
//         `${API_URL}/api/food/getClaimedFood`,
//         {},
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );

//       setClaimedFood(response.data || []);
     
//     } catch (error) {
//       console.error("Error fetching claimed food:", error);
//     }
//   };


//   useEffect(() => {
//     fetchItems();
//     fetchClaimedFood();
//     fetchDonatedFood();
//   }, []);

//   return (
//     <ItemsContext.Provider
//       value={{
//         items,
//         donatedFood,
//         claimedFood,
//         loading,
//         fetchItems,
//         fetchDonatedFood,
//         fetchClaimedFood,
//         setUser,
//         user
//       }}
//     >
//       {children}
//     </ItemsContext.Provider>
//   );
// };


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
  const [user, setUser] = useState({});
  const[events,setEvents]=useState([])
  const API_URL = Constants.expoConfig.extra.API_URL;

  const setUserAndStore = async (userData) => {
    try {
      setUser(userData);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) return;

      const response = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      console.log(response.data)
            await SecureStore.setItemAsync(
              "userData",
              JSON.stringify(response.data)
            );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 
  const loadUserData = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const fetchItems = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      console.warn("User token not available. Skipping fetchItems.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/food/available`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchEvents=async()=>{
    console.log("object")
    try {
     const response=await axios.get(`${API_URL}/api/events/`) 
     console.log(response.data,"dsfs")
     setEvents(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchDonatedFood = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (!userToken) return;

      const response = await axios.post(
        `${API_URL}/api/food/getDonatedFood`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      setDonatedFood(response.data || []);
      console.log(JSON.stringify(response.data,null,2))
    } catch (error) {
      console.error("Error fetching donated food:", error);
    }
  };

  const fetchClaimedFood = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (!userToken) return;

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

  useEffect(() => {
    loadUserData();
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
        setUser: setUserAndStore,
        user,
        fetchUser,
        events,
        fetchEvents

      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
