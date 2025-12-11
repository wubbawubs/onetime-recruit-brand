import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: Record<string, User> = {
  "juliette@onetimerecruit.nl": {
    id: "1",
    email: "juliette@onetimerecruit.nl",
    name: "Juliëtte Welten",
    role: "Recruitment Manager",
    avatar: undefined,
  },
  "demo@onetimerecruit.nl": {
    id: "2",
    email: "demo@onetimerecruit.nl",
    name: "Juliëtte Welten",
    role: "Recruitment Manager",
    avatar: undefined,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("otr_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const foundUser = mockUsers[email.toLowerCase()];
    if (foundUser && password.length >= 4) {
      setUser(foundUser);
      localStorage.setItem("otr_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("otr_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
