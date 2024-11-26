import { toast } from "react-toastify";
import { useHttp } from "@/hooks";
import { useAuthStore } from "@/stores";
import type { Credentials, LoginResponse } from "@/types/auth";

export const useAuthService = () => {
  const { httpClient, handleApiError } = useHttp();
  const { SET_USER, SET_TOKEN } = useAuthStore();

  const authenticateCredentials = async (credentials: Credentials, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return await httpClient
      .post<LoginResponse>("auth/login", credentials)
      .then((response) => {
        const { user, token } = response.data;
        SET_USER(user);
        SET_TOKEN(token);

        toast.success("Authenticated! Redirecting to dashboard");

        setTimeout(() => {
          window.location.href = "/dashboard/";
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  const unauthenticateCredentials = async () => {
    return await httpClient
      .post("auth/logout", null)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createAccount = async (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return await httpClient
      .post("auth/signup", data)
      .then(async () => {
        toast.success("Successfully created your account");

        return await authenticateCredentials({ email: data.email, password: data.password }, setLoading);
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  return {
    createAccount,
    authenticateCredentials,
    unauthenticateCredentials,
  };
};
