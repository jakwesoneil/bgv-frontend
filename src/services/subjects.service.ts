import { toast } from "react-toastify";
import { useHttp } from "@/hooks";

export const useSubjectsService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getSubjects = async () => {
    return await httpClient
      .get("subjects")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getSubject = async (id: number) => {
    return await httpClient
      .get("subjects/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createSubject = async (data: any) => {
    return await httpClient
      .post("subjects", data)
      .then(() => {
        toast.success("Subject created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteSubject = async (id: number) => {
    return await httpClient
      .delete("subjects/" + id)
      .then(() => {
        toast.info("Subject deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getSubjects,
    getSubject,
    createSubject,
    deleteSubject,
  };
};
