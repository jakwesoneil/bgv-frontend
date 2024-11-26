import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { httpClient } from "@/api";
import { HTTP_RESPONSES } from "@/constants";

export const useHttp = () => {
  const handleApiError = (error: AxiosError | unknown) => {
    if (error instanceof AxiosError) {
      const code = error.response?.status;

      if (code === HTTP_RESPONSES.UNAUTHORIZED) {
        toast.error("Ooops! Unauthorized Access");

        return;
      }
    }

    toast.error("Error");
  };

  return {
    httpClient,
    handleApiError,
  };
};
