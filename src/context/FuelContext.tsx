
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define our types
interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'topup' | 'payment';
  description: string;
}

interface UserProfile {
  name: string;
  carType: string;
  preferredFuelType: 'Petrol' | 'Diesel' | 'Electric' | 'E10';
  walletBalance: number;
  transactions: Transaction[];
}

// Mock initial data
const initialUserProfile: UserProfile = {
  name: "John Doe",
  carType: "SUV",
  preferredFuelType: "Petrol",
  walletBalance: 50.00,
  transactions: [
    {
      id: "tx1",
      date: new Date(Date.now() - 86400000),
      amount: 50.00,
      type: "topup",
      description: "Wallet top-up"
    }
  ]
};

// Create context
interface FuelContextType {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  addTransaction: (amount: number, type: 'topup' | 'payment', description: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  generateQrData: () => string;
  processPayment: (amount: number) => boolean;
}

const FuelContext = createContext<FuelContextType | undefined>(undefined);

export function FuelProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    // Check localStorage for saved data
    const savedProfile = localStorage.getItem("fuelUserProfile");
    return savedProfile ? JSON.parse(savedProfile) : initialUserProfile;
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("fuelUserProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  const addTransaction = (amount: number, type: 'topup' | 'payment', description: string) => {
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      date: new Date(),
      amount,
      type,
      description
    };

    const newBalance = type === 'topup' 
      ? userProfile.walletBalance + amount 
      : userProfile.walletBalance - amount;

    setUserProfile({
      ...userProfile,
      walletBalance: newBalance,
      transactions: [newTransaction, ...userProfile.transactions]
    });

    toast(
      type === 'topup' ? "Top-up Successful" : "Payment Successful", 
      { description: `${type === 'topup' ? '+' : '-'}$${amount.toFixed(2)}` }
    );
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
    toast("Profile Updated", { description: "Your preferences have been saved" });
  };

  // Generate QR code data with wallet details 
  const generateQrData = () => {
    const qrData = {
      userId: "user123", // In a real app, this would be a secure ID
      name: userProfile.name,
      fuelType: userProfile.preferredFuelType,
      balance: userProfile.walletBalance,
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(qrData);
  };

  // Process a payment
  const processPayment = (amount: number) => {
    if (amount <= 0) {
      toast("Invalid Amount", { description: "Amount must be greater than 0" });
      return false;
    }
    
    if (amount > userProfile.walletBalance) {
      toast("Insufficient Funds", { description: "Please top up your wallet" });
      return false;
    }
    
    addTransaction(amount, 'payment', 'Fuel payment');
    return true;
  };

  return (
    <FuelContext.Provider value={{ 
      userProfile, 
      setUserProfile, 
      addTransaction,
      updateProfile,
      generateQrData,
      processPayment
    }}>
      {children}
    </FuelContext.Provider>
  );
}

export function useFuel() {
  const context = useContext(FuelContext);
  if (context === undefined) {
    throw new Error("useFuel must be used within a FuelProvider");
  }
  return context;
}
