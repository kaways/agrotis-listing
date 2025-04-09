import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/user";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  isEditMode: false,
  setIsEditMode: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        isEditMode, 
        setIsEditMode 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);