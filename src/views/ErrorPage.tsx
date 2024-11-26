import React from "react";
import { useNavigate } from "react-router-dom";
import { Theme, Flex, Button } from "@radix-ui/themes";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <Theme appearance="dark">
      <Flex direction="column" justify="center" align="center" gap="2" className="h-screen w-screen">
        <h1 className="text-[32px] text-white font-bold">PAGE NOT FOUND</h1>
        <Button color="blue" variant="soft" onClick={handleGoHome}>
          Back to home
        </Button>
      </Flex>
    </Theme>
  );
};

export default ErrorPage;
