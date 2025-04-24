
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useFuel } from "@/context/FuelContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const fuelTypes = ["Petrol", "Diesel", "Electric", "E10"];
const carTypes = ["Sedan", "SUV", "Hatchback", "Van", "Truck", "Sports"];

const ProfilePage = () => {
  const { userProfile, updateProfile } = useFuel();
  
  const [formData, setFormData] = useState({
    name: userProfile.name,
    carType: userProfile.carType,
    preferredFuelType: userProfile.preferredFuelType
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <AppLayout title="Profile Settings">
      <div className="container mx-auto p-4 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-medium mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carType">Vehicle Type</Label>
                <Select 
                  value={formData.carType} 
                  onValueChange={(value) => handleChange("carType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    {carTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuelType">Preferred Fuel Type</Label>
                <Select 
                  value={formData.preferredFuelType} 
                  onValueChange={(value) => handleChange("preferredFuelType", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
          
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
