import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  cn
  
} from '@/utils/cn';
 import logo from '@/assets/logo.png';
const MenuItem = ({ 
  icon: Icon, 
  label, 
  path, 
  isActive 
}: { 
  icon: React.ElementType; 
  label: string; 
  path: string; 
  isActive: boolean;
}) => (
  <Link to={path} className="w-full">
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
        "hover:bg-blue-50 hover:text-blue-500",
        isActive ? "bg-blue-100 text-blue-500" : "text-gray-500"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-s font-medium">{label}</span>
    </div>
  </Link>
);

const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>
);

const Sidebar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const menuConfigs = {
    Manager: [
      { path: '/home/manager/dashboard', icon: HomeIcon, label: 'Dashboard' },
      { path: '/home/manager/patients', icon: UserIcon, label: 'Patient' },
      { path: '/home/manager/meals', icon: UtensilsIcon, label: 'Diet' },
    ],
    Pantry: [
      { path: '/home/pantry/dashboard', icon: HomeIcon, label: 'Pantry' },
      { path: '/home/pantry/meal-preparation', icon: UtensilsIcon, label: 'Meal' },
      { path: '/home/pantry/delivery-personnel', icon: UsersIcon, label: 'Delivery' },
      { path: '/home/pantry/delivery-status', icon: TruckIcon, label: 'Delivery' },
    ],
    Delivery: [
      { path: '/home/delivery/dashboard', icon: HomeIcon, label: 'Dashboard' },
      { path: '/home/delivery/assigned-deliveries', icon: TruckIcon, label: 'Assigned' },
    ],
  };

  const menuItems = isAuthenticated && user ? menuConfigs[user.role as keyof typeof menuConfigs] || [] : [];

  return (
    <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col fixed z-50">
      {/* Header */}
      <div className="p-6 ">
       <Link 
  to="/" 
  className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
>
  <div className="w-12 h-12 flex items-center justify-center">
    <img src={logo} alt="Logo"  />
  </div>
  <span className="text-xl font-bold text-gray-900">NutriTray</span>
</Link>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item: { path: string; icon: React.ElementType; label: string }) => (
            <MenuItem
              key={item.path}
              {...item}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>

      {/* User Profile */}
      {isAuthenticated && user && (
        <div className="p-4 border-t border-gray-200">
        <MenuItem
          icon={LogoutIcon}
          label="Logout"
          path="/logout"
          isActive={false}
        />
        </div>
      )}
    </aside>
  );
};

// Icons (using heroicons style)
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const UtensilsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
    />
  </svg>
);



const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    />
  </svg>
);

export default Sidebar;