import React from "react";
import { Theme, Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <Theme appearance="dark">
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full z-[-1] object-cover pointer-events-none zoom object-bottom scale-150">
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-0"></div>

        {/* Foreground Content */}
        <Flex justify="center" align="center" direction="column" gap="2" className="h-screen z-10 text-white backdrop-blur-sm" style={{ zoom: 0.75 }}>
          <h1 className="text-2xl font-bold">BGV LABS</h1>
          <p className="mb-5">Learning Management System</p>

          <Outlet />

          <p className="text-sm mt-4">All Rights Reserved. &copy; 2024</p>
        </Flex>
      </div>
    </Theme>
  );
};
