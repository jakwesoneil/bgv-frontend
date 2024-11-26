import axios from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks";
import { APP_API_URL } from "@/constants";

export const useLectureExamsService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getLectureExams = async () => {
    return await httpClient
      .get("lecture-exams")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getLectureExam = async (id: number) => {
    return await httpClient
      .get("lecture-exams/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createLectureExam = async (data: any) => {
    const url = APP_API_URL;
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return await axios
      .post(url + "lecture-exams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Lecture exam created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateLectureExam = async (id: number, data: any) => {
    return await httpClient
      .patch("lecture-exams/" + id, data)
      .then(() => {
        toast.success("Lecture exam updated!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteLectureExam = async (id: number) => {
    return await httpClient
      .delete("lecture-exams/" + id)
      .then(() => {
        toast.info("Lecture exam deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getLectureExams,
    getLectureExam,
    createLectureExam,
    updateLectureExam,
    deleteLectureExam,
  };
};
