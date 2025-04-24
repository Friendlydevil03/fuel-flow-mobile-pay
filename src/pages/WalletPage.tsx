
import { useState } from "react";
import { useFuel } from "@/context/FuelContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import { ArrowUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const WalletPage = () => {
  const { userProfile, addTransaction } = useFuel();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("10");

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      addTransaction(amount, "topup", "Wallet top-up");
      setIsTopUpOpen(false);
    }
  };

  const quickAmounts = [10, 20, 50, 100];

  return (
    <AppLayout title="Fuel Wallet">
      <div className="container mx-auto p-4 space-y-6">
        {/* Balance Card */}
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 fuel-gradient opacity-90 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-white text-lg font-medium mb-1">Your Balance</h2>
            <p className="text-white text-3xl font-semibold mb-4">
              ${userProfile.walletBalance.toFixed(2)}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Preferred Fuel</p>
                <p className="text-white text-md font-medium">{userProfile.preferredFuelType}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-secondary hover:bg-gray-100"
                onClick={() => setIsTopUpOpen(true)}
              >
                <ArrowUp className="h-4 w-4 mr-1" /> Top Up
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-lg font-medium mb-3">Recent Transactions</h2>
          <div className="space-y-3">
            {userProfile.transactions.length === 0 ? (
              <p className="text-center text-gray-500 my-8">No transactions yet</p>
            ) : (
              userProfile.transactions.slice(0, 5).map((tx) => (
                <Card key={tx.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={tx.type === "topup" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {tx.type === "topup" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Top Up Dialog */}
        <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Top Up Your Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((amount) => (
                  <Button 
                    key={amount} 
                    variant={topUpAmount === amount.toString() ? "default" : "outline"} 
                    onClick={() => setTopUpAmount(amount.toString())}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="mt-2">
                <label htmlFor="custom-amount" className="text-sm font-medium">
                  Or enter custom amount:
                </label>
                <Input
                  id="custom-amount"
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="mt-1"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>Cancel</Button>
              <Button onClick={handleTopUp}>Top Up</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default WalletPage;
