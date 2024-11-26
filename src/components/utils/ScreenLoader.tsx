import React from "react";
import { Spinner } from "@radix-ui/themes";

export const ScreenLoader: React.FC = () => {
  return (
    <div className="h-[70vh] w-full flex flex-col gap-y-3 justify-center items-center">
      <Spinner size="3" />
    </div>
  );
};
