import React from "react";
import { Flex } from "@radix-ui/themes";

type Props = {
  label: string;
  isLast: boolean;
};

export const AppBreadcrumbItem: React.FC<Props> = (props) => {
  return (
    <Flex direction="row" align="center" gap="2">
      <span className="text-xs text-zinc-950 capitalize">{props.label}</span>
      {!props.isLast ? "/" : null}
    </Flex>
  );
};
