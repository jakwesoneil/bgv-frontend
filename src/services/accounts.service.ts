import axios from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks";
import { APP_API_URL } from "@/constants";

export const useAccountsService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getAccounts = async (type: "teacher" | "student" = "teacher") => {
    return await httpClient
      .get("accounts-filtered/" + type)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getAccount = async (id: number) => {
    return await httpClient
      .get("accounts/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createAccount = async (data: any) => {
    const url = APP_API_URL;
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return await axios
      .post(url + "accounts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Account created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateAccount = async (id: number, data: any) => {
    return await httpClient
      .patch("accounts/" + id, data)
      .then(() => {
        toast.success("Account updated!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteAccount = async (id: number) => {
    return await httpClient
      .delete("accounts/" + id)
      .then(() => {
        toast.info("Account deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
  };
};
