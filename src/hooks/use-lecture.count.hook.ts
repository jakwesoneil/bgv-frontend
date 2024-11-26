import { useEffect, useState } from "react";
import { useLecturesService } from "@/services/lectures.service";

export const useLectureCount = () => {
  const { getLectures } = useLecturesService();
  const [totalLectures, setTotalLectures] = useState(0);
  const [lectures, setLectures] = useState([]);

  const fetchLectures = async () => {
    try {
      const fetchedLectures = await getLectures();
      setLectures(fetchedLectures);
      setTotalLectures(fetchedLectures.length);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return {
    totalLectures,
    lectures,
  };
};
