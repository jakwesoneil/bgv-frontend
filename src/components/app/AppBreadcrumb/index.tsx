import React from "react";
import { useLocation } from "react-router-dom";
import { Flex } from "@radix-ui/themes";
import { AppBreadcrumbItem } from "./AppBreadcrumbItem";

export const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const [paths, setPaths] = React.useState<any[]>();

  const generatePaths = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const items = pathnames.map((_, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;

      return { name: pathnames[index], to };
    });

    setPaths(items);
  };

  const isLastItem = (index: number) => index + 1 === paths?.length;

  React.useEffect(() => {
    generatePaths();
  }, []);

  return (
    <Flex gap="3" align="center">
      {paths?.map((item, index) => (
        <AppBreadcrumbItem key={item.name} label={item.name} isLast={isLastItem(index)} />
      ))}
    </Flex>
  );
};
