import { toast } from "react-toastify";
import { useHttp } from "@/hooks";

export const useStudentsService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getStudents = async () => {
    return await httpClient
      .get("students")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getStudent = async (id: number) => {
    return await httpClient
      .get("students/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createStudent = async (data: any) => {
    return await httpClient
      .post("students", data)
      .then(() => {
        toast.success("Student created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteStudent = async (id: number) => {
    return await httpClient
      .delete("students/" + id)
      .then(() => {
        toast.info("Student deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
  };
};
