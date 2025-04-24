
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useFuel } from "@/context/FuelContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

type ScanState = "ready" | "scanning" | "result";

const ScannerPage = () => {
  const { processPayment } = useFuel();
  const [scanState, setScanState] = useState<ScanState>("ready");
  const [scanData, setScanData] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleScan = () => {
    // In a real app, this would use a camera API to scan a QR code
    // For demo purposes, we'll simulate finding a QR code after a delay
    setScanState("scanning");
    
    setTimeout(() => {
      // Mock scan result
      const mockScanData = {
        userId: "user123",
        name: "John Doe",
        fuelType: "Petrol",
        balance: 50.00,
        timestamp: new Date().toISOString()
      };
      
      setScanData(mockScanData);
      setScanState("result");
      toast("QR Code Detected", { description: "Customer wallet found" });
    }, 2000);
  };

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast("Invalid Amount", { description: "Please enter a valid amount" });
      return;
    }

    if (processPayment(amount)) {
      setIsDialogOpen(false);
      toast.success("Payment Processed", { 
        description: `$${amount.toFixed(2)} has been deducted from the customer's wallet.` 
      });
      // Reset the scanner after payment
      setScanState("ready");
      setScanData(null);
    }
  };

  const resetScan = () => {
    setScanState("ready");
    setScanData(null);
  };

  return (
    <AppLayout title="Scan Payment">
      <div className="container mx-auto p-4 flex flex-col items-center justify-center h-full">
        {scanState === "ready" && (
          <Card className="p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-medium mb-4">Ready to Scan</h2>
            <p className="text-gray-500 mb-6">
              Scan a customer's QR code to process a fuel payment
            </p>
            <Button onClick={handleScan} size="lg" className="w-full">
              Start Scanning
            </Button>
          </Card>
        )}

        {scanState === "scanning" && (
          <div className="text-center">
            <div className="w-64 h-64 border-4 border-primary mx-auto relative mb-4">
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="h-0.5 w-full bg-primary absolute top-1/2 animate-pulse"></div>
            </div>
            <p className="text-lg">Scanning for QR code...</p>
            <Button variant="outline" onClick={resetScan} className="mt-4">
              Cancel
            </Button>
          </div>
        )}

        {scanState === "result" && scanData && (
          <Card className="p-6 w-full max-w-md">
            <h2 className="text-xl font-medium mb-4 text-center">Customer Found</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{scanData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Preferred Fuel:</span>
                <span className="font-medium">{scanData.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Wallet Balance:</span>
                <span className="font-medium">${scanData.balance.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="w-full"
              >
                Process Payment
              </Button>
              <Button 
                variant="outline" 
                onClick={resetScan}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Payment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Process Fuel Payment</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">
                Enter payment amount:
              </label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                min="0.01"
                step="0.01"
              />
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Customer: {scanData?.name}</p>
                <p>Available Balance: ${scanData?.balance.toFixed(2)}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment}>
                Complete Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ScannerPage;
