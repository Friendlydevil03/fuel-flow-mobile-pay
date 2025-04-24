
import { Link, useLocation } from "react-router-dom";
import { Wallet, QrCode, Barcode, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Wallet",
      icon: <Wallet className="h-6 w-6" />,
      path: "/wallet",
    },
    {
      label: "Pay",
      icon: <QrCode className="h-6 w-6" />,
      path: "/pay",
    },
    {
      label: "Scan",
      icon: <Barcode className="h-6 w-6" />,
      path: "/scan",
    },
    {
      label: "Profile",
      icon: <Settings className="h-6 w-6" />,
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 z-10">
      {navItems.map((item) => (
        <Link 
          to={item.path} 
          key={item.path}
          className={cn(
            "flex flex-col items-center w-1/4 py-1",
            location.pathname === item.path 
              ? "text-primary" 
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
