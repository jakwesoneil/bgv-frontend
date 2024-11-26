import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const TeacherSidebar: React.FC = () => {
  const location = useLocation();

  const linkClasses = "h-[35px] flex items-center text-sm text-left rounded-lg !pl-2";
  const activeClasses = "border-l-4 border-blue-400 text-blue-400";

  return (
    <Flex direction="column" gap="1" className="mt-5">
      <Link
        to="/dashboard"
        className={`${linkClasses} ${location.pathname === "/dashboard" ? activeClasses : "hover:bg-slate-800"}`}
      >
        Dashboard
      </Link>
      <Link
        to="/dashboard/manage/laboratories"
        className={`${linkClasses} ${location.pathname === "/dashboard/manage/laboratories" ? activeClasses : "hover:bg-slate-800"}`}
      >
        Laboratories
      </Link>
    </Flex>
  );
};

