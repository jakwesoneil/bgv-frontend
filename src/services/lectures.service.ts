import axios from "axios";
// import swal from "sweetalert2";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks";
import { APP_API_URL } from "@/constants";

export const useLecturesService = () => {
  const { httpClient, handleApiError } = useHttp();

  const submitLaboratory = async (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const url = APP_API_URL;
    let formData = new FormData();

    formData.append("user_id", data.user_id);
    formData.append("lecture_id", data.lecture_id);
    formData.append("questions", data.questions);
    formData.append("quiz_score", data.quiz_score);

    data.lab_files.forEach((labFile: any) => formData.append(`files[]`, labFile));

    return await axios
      .post(url + "lab-submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Great! You have submitted for this laboratory, record created!");

        setTimeout(() => {
          window.location.pathname = "/dashboard/my-laboratories";
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  const getLaboratorySubmissions = async (laboratoryId: number) => {
    return await httpClient
      .get("get-laboratory-submissions/" + laboratoryId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getTeacherLaboratories = async (userId: number) => {
    return await httpClient
      .get("get-teacher-laboratories/" + userId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getMyLaboratories = async (userId: number) => {
    return await httpClient
      .get("my-laboratories/" + userId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getLectures = async () => {
    return await httpClient
      .get("lectures")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getLecture = async (id: number) => {
    return await httpClient
      .get("lectures/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createLecture = async (data: any) => {
    const url = APP_API_URL;
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return await axios
      .post(url + "lectures", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Laboratory created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateLectureModule = async (id: number, file: any) => {
    console.log("updateLectureModule", file);
    const url = APP_API_URL;
    let formData = new FormData();

    formData.append("module", file);

    return await axios
      .post(url + "lecture-update-module/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Laboratory instruction updated!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateLecture = async (id: number, data: any) => {
    return await httpClient
      .patch("lectures/" + id, data)
      .then(() => {
        toast.success("Laboratory updated!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteLecture = async (id: number) => {
    return await httpClient
      .delete("lectures/" + id)
      .then(() => {
        toast.info("Lecture deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    submitLaboratory,
    getLaboratorySubmissions,
    getTeacherLaboratories,
    getMyLaboratories,
    getLectures,
    getLecture,
    createLecture,
    updateLectureModule,
    updateLecture,
    deleteLecture,
  };
};
