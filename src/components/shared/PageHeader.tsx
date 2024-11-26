import React from "react";
import { Flex } from "@radix-ui/themes";

type Props = React.PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export const PageHeader: React.FC<Props> = (props) => {
  return (
    <Flex direction="row" justify="between" align="start" className="w-full px-3">
      <div>
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <h4 className="text-xs text-gray-600 mt-1">{props.subtitle}</h4>
      </div>

      <div>{props.children}</div>
    </Flex>
  );
};
