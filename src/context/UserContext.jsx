"use client";
import { createContext, useContext, useState, useEffect } from "react";
import cookies from 'js-cookie';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const intialData = {
    id: null,
    email: null,
    name: null,
  }
  const [userData, setUserData] = useState(intialData); 
  const [isLoading, setIsLoading] = useState(true);

const fetchUserData = async () =>{
  try {
    const response = await fetch("/api/loggedUser");
    const data = await response.json();

    if (data.success) {
      setUserData({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      }); 
    console.log("data.user",data.user)
    } else {
      setUserData(null); // No user logged in
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    setUserData(null);
  } finally {
    setIsLoading(false); // Loading is done
  }
}
useEffect(() => {
  fetchUserData();
}, []);

const logoutUser =() =>{
  cookies.set("authToken", "", { maxAge: -1 });
  setUserData(intialData);
  router.push("/");
}

  return (
    <UserContext.Provider value={{ userData, isLoading, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}