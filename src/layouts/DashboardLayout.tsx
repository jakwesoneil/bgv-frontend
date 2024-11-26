import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Theme, Flex, Box, Button, Badge } from "@radix-ui/themes";
import { useAuth } from "@/hooks";
import { AppBreadcrumb, AdminSidebar, TeacherSidebar, StudentSidebar } from "@/components";

type UserRoles = "admin" | "teacher" | "student";

export const DashboardLayout: React.FC = () => {
  const { checkAuth, userRole, userFullname, logout } = useAuth();

  if (!checkAuth()) {
    return <Navigate to="/auth/signin" />;
  }

  const RenderSidebar: React.FC<{ userRole: UserRoles }> = (props) => {
    if (props.userRole.toLowerCase() === "teacher") return <TeacherSidebar />;
    if (props.userRole.toLowerCase() === "student") return <StudentSidebar />;

    return <AdminSidebar />;
  };

  return (
    <Theme appearance="dark" scaling="90%">
      <Flex direction="column" className="w-full h-full max-w-screen overflow-hidden">
        {/* Header Section */}
        <Flex className="h-[60px] w-full border-b border-zinc-800 bg-zinc-950 px-7" align="center" justify="between">
          <Flex align="center">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <div className="ml-2">
              <h1 className="text-xl font-bold">BGV LABS</h1>
              <h1 className="text-xs">Learning Management System</h1>
            </div>
          </Flex>

          <Flex gap="6" justify="center">
            <p className="text-[12px]">
              Account Type <Badge color="amber">{userRole}</Badge>
            </p>
            <Badge color="red">
              <Button variant="ghost" className="!text-red-200 text-lg font-bold" onClick={logout}>
                LOGOUT
              </Button>
            </Badge>
          </Flex>
        </Flex>

        {/* Main Content Section */}
        <Flex direction="row" className="w-full h-[calc(100vh-60px)] overflow-hidden">
          {/* Sidebar */}
          <Box className="w-[200px] h-[300px] border-r border-zinc-950 px-5 pt-2 overflow-y-auto">
            <div className="py-4">
              <small className="font-bold">Logged-in as</small>
              <Badge size="3">{userFullname}</Badge>
            </div>
            <p className="text-m text-gray-400 ">Manage &mdash;</p>
            <RenderSidebar userRole={userRole as UserRoles} />
          </Box>

          {/* Main Content Area */}
          <Box className="flex-1 h-full px-3 pt-2 overflow-y-auto bg-zinc-50 border-zinc-950 text-zinc-800 ">
            <AppBreadcrumb />
            <Box className="mt-7 overflow-hidden ">
              <Outlet />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Theme>
  );
};
