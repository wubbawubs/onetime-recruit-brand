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
  "juliette@onetimerooted.nl": {
    id: "1",
    email: "juliette@onetimerooted.nl",
    name: "Juliëtte Welten",
    role: "Recruitment Manager",
    avatar: undefined,
  },
  "demo@onetimerooted.nl": {
    id: "2",
    email: "demo@onetimerooted.nl",
    name: "Juliëtte Welten",
    role: "Recruitment Manager",
    avatar: undefined,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for stored session immediately (no loading screen)
    const storedUser = localStorage.getItem("otr_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers[email.toLowerCase()];
    if (foundUser && password.length >= 4) {
      // Show loading animation for full duration
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2800));
      
      setUser(foundUser);
      localStorage.setItem("otr_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("otr_user");
  };

  // Don't render children until initialized
  if (!isInitialized) {
    return null;
  }

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
