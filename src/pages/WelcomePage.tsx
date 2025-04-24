
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const WelcomePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const onboarding = [
    {
      title: "Welcome to FuelFlow",
      description: "The easiest way to pay for fuel with your mobile device",
      image: "⛽"
    },
    {
      title: "Top Up Your Wallet",
      description: "Add funds to your wallet and pay for fuel without cash or cards",
      image: "💳"
    },
    {
      title: "Scan & Go",
      description: "Simply scan the QR code at the pump to pay instantly",
      image: "📱"
    }
  ];

  const handleNext = () => {
    if (currentStep < onboarding.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/wallet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{onboarding[currentStep].image}</div>
          <h1 className="text-2xl font-bold mb-2">{onboarding[currentStep].title}</h1>
          <p className="text-gray-600">{onboarding[currentStep].description}</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboarding.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNext} 
          className="w-full"
          size="lg"
        >
          {currentStep < onboarding.length - 1 ? "Next" : "Get Started"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default WelcomePage;
