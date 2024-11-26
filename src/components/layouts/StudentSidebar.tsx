import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const StudentSidebar: React.FC = () => {
  const location = useLocation();
  
  const linkClasses = "h-[35px] flex items-center text-xs text-left rounded-lg !pl-2";
  const activeClasses = "border-l-4 border-blue-400 text-blue-400";

  return (
    <Flex direction="column" gap="1" className="mt-5 w-full max-w-[200px] md:max-w-[250px] flex-shrink-0">
      <Link
        to="/dashboard/laboratories/browse"
        className={`${linkClasses} ${location.pathname === "/dashboard/laboratories/browse" ? activeClasses : "hover:bg-slate-800"}`}
      >
        Browse Laboratories
      </Link>
      <Link
        to="/dashboard/my-laboratories"
        className={`${linkClasses} ${location.pathname === "/dashboard/my-laboratories" ? activeClasses : "hover:bg-slate-800"}`}
      >
        My Laboratories
      </Link>
    </Flex>
  );
};
