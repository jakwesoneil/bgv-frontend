import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Card, Flex, TextField, Select, Button } from "@radix-ui/themes";
import { useAuthService } from "@/services";
import type { Credentials } from "@/types/auth";

type AccountInfo = {
  name: string;
  confirmPassword: string;
  account_type?: "teacher" | "student";
} & Credentials;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm<AccountInfo>();
  const { createAccount } = useAuthService();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onFormSubmit: SubmitHandler<AccountInfo> = async (formData): Promise<any> => {
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return toast.warning("Passwords do not match!");
    }

    return await createAccount(formData, setLoading);
  };

  const handleRedirectToLogin = () => {
    navigate("/auth/signin");
  };

  return (
    <Card className="w-[400px] !p-5">
      <h1 className="text-center mb-5">LOGIN TO YOUR ACCOUNT</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <small>Select Account Type</small>
            <Select.Root defaultValue="" onValueChange={(v) => setValue("account_type", v as AccountInfo["account_type"])} required>
              <Select.Trigger color="blue" />
              <Select.Content color="blue">
                <Select.Group>
                  <Select.Item value="teacher">Teacher</Select.Item>
                  <Select.Item value="student">Student</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="text" size="3" placeholder="Enter name" {...field} required autoFocus />}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="email" size="3" placeholder="Enter e-mail" {...field} required autoFocus />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="password" size="3" placeholder="Enter password" {...field} required />}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="password" size="3" placeholder="Enter confirmed password" {...field} required />}
          />
          <Button type="submit" color ="blue" size="3" loading={loading}>
            Create Account
          </Button>
          <div className="!w-full px-3">
            <Button size="3" color ="blue" variant="ghost" className="!w-full" onClick={handleRedirectToLogin}>
              Already have an account? Log in
            </Button>
          </div>
        </Flex>
      </form>
    </Card>
  );
};

export default SignupPage;
