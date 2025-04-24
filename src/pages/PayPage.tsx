
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useFuel } from "@/context/FuelContext";
import { Card } from "@/components/ui/card";
import QRCode from "react-qr-code";

const PayPage = () => {
  const { generateQrData, userProfile } = useFuel();
  const [qrValue, setQrValue] = useState("");
  
  // Regenerate QR code data every 30 seconds for security
  useEffect(() => {
    const updateQrData = () => {
      setQrValue(generateQrData());
    };
    
    // Generate initial QR data
    updateQrData();
    
    // Set up interval to refresh QR data
    const intervalId = setInterval(updateQrData, 30000);
    
    return () => clearInterval(intervalId);
  }, [generateQrData, userProfile.walletBalance]);

  return (
    <AppLayout title="Pay for Fuel">
      <div className="container mx-auto p-4 flex flex-col items-center justify-center h-full">
        <Card className="p-6 w-full max-w-md flex flex-col items-center">
          <h2 className="text-xl font-medium mb-2">Your Payment QR Code</h2>
          <p className="text-gray-500 text-center mb-6">
            Scan this code at the fuel station to pay using your wallet
          </p>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-lg bg-purple-100 animate-pulse-ring"></div>
            <div className="relative p-4 bg-white rounded-lg border border-gray-200">
              {qrValue && (
                <QRCode
                  value={qrValue}
                  size={200}
                  level="H"
                  className="mx-auto"
                />
              )}
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500">Balance:</span>
              <span className="font-medium">${userProfile.walletBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Fuel Type:</span>
              <span className="font-medium">{userProfile.preferredFuelType}</span>
            </div>
          </div>
        </Card>
        
        <p className="text-sm text-gray-500 mt-4 text-center px-4">
          QR code refreshes automatically every 30 seconds for your security
        </p>
      </div>
    </AppLayout>
  );
};

export default PayPage;
