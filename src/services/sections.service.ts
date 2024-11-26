import { toast } from "react-toastify";
import { useHttp } from "@/hooks";

export const useSectionsService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getSections = async () => {
    return await httpClient
      .get("sections")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getSection = async (id: number) => {
    return await httpClient
      .get("sections/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createSection = async (data: any) => {
    return await httpClient
      .post("sections", data)
      .then(() => {
        toast.success("Section created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateSection = async (id: number, data: any) => {
    return await httpClient
      .patch("sections/" + id, data)
      .then(() => {
        toast.success("Section updated!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteSection = async (id: number) => {
    return await httpClient
      .delete("sections/" + id)
      .then(() => {
        toast.info("Section deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getSections,
    getSection,
    createSection,
    updateSection,
    deleteSection,
  };
};
