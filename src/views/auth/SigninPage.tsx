import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Card, Flex, TextField, Button } from "@radix-ui/themes";
import { useAuthService } from "@/services";
import type { Credentials } from "@/types/auth";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<Credentials>();
  const { authenticateCredentials } = useAuthService();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onFormSubmit: SubmitHandler<Credentials> = async (formData): Promise<void> => {
    setLoading(true);
    return await authenticateCredentials(formData, setLoading);
  };

  const handleRedirectToSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <Card className="w-[400px] !p-5">
      <h1 className="text-center mb-5">LOGIN TO YOUR ACCOUNT</h1>
      <Flex justify="center">
        <img src="/logo.png" alt="Logo" className="h-20 w-20 mb-6"/>

      </Flex>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex direction="column" gap="4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root color="blue" type="email" size="3" placeholder="Enter e-mail" {...field} required autoFocus />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root color="blue" type="password" size="3" placeholder="Enter password" {...field} required />}
          />
          <Button color ="blue" type="submit" size="3" loading={loading}>
            Log In
          </Button>

          <Flex direction="column" gap="4"  className="!w-full px-3 mt-4">

            <Button size="3" variant="ghost" color="blue" className="!w-full py-3" onClick={handleRedirectToSignup}>
              Create Account
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default SigninPage;
