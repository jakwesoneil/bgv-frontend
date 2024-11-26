import React from "react";
import { ScreenLoader } from "./ScreenLoader";

export const LoadComponent = (Component: React.ComponentType) => {
  return (
    <React.Suspense fallback={<ScreenLoader />}>
      <Component />
    </React.Suspense>
  );
};
