
import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface AppLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
  title?: string;
}

const AppLayout = ({ children, hideNavigation = false, title }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {title && (
        <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 h-14 flex items-center justify-center">
            <h1 className="text-lg font-medium">{title}</h1>
          </div>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
