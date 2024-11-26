import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Flex, Card, Button } from "@radix-ui/themes";
import { useAuth, useLectureCount } from "@/hooks";
import { useAccountsService } from "@/services";
import { useNavigate } from "react-router-dom";

const OverviewPage: React.FC = () => {
  const { totalLectures, lectures } = useLectureCount();
  const { getAccounts } = useAccountsService();
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const IS_ADMIN = userRole === "ADMIN";
  const IS_TEACHER = userRole === "TEACHER";
  const IS_STUDENT = userRole === "STUDENT";

  const [teachersCount, setTeachersCount] = React.useState(0);
  const [studentsCount, setStudentsCount] = React.useState(0);

  React.useEffect(() => {
    getAccounts("student").then((data) => {
      setStudentsCount(data.length);
    });

    getAccounts("teacher").then((data) => {
      setTeachersCount(data.length);
    });
  }, []);

  const items = lectures.map((lecture: any) => (
    <Card
      key={lecture.id}
      className="p-2 flex flex-col min-w-[300px] max-w-[400px] flex-1 flex-shrink-0 flex-grow-0 mx-auto bg-zinc-950 rounded-none"
    >
      <h2 className="font-bold text-xl sm:text-2xl text-center">{lecture.week_no}</h2>
      <p className="text-m sm:text-md text-center">{lecture.title}</p>
      <p className="mt-1 text-xs sm:text-xs text-center">{lecture.description}</p>
      <Flex justify="center" className="mt-2">
        <Button
          color="blue"
          variant="soft"
          className="mt-2 text-blue-500 underline contents-center mx-auto justify-center"
          onClick={() => navigate(`/dashboard/manage/laboratories/${lecture.id}/edit`)}
        >
          View
        </Button>
      </Flex>
    </Card>
  ));

  if (IS_STUDENT) {
    return (
      <Flex>
        <h1>Student Dashboard Home</h1>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="5">
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7 bg-zinc-950">
          <h1 className="font-bold text-zinc-50">TOTAL STUDENTS</h1>
          <p className="text-[32px] text-center text-zinc-50  mt-3">{studentsCount}</p>
        </Card>
        {IS_ADMIN ? (
          <Card className="w-full !py-3 !px-7 bg-zinc-950">
            <h1 className="font-bold text-zinc-50">TOTAL TEACHERS</h1>
            <p className="text-[32px] text-center text-zinc-50  mt-3">{teachersCount}</p>
          </Card>
        ) : null}
        {IS_TEACHER ? (
          <Card className="w-full !py-3 !px-7 bg-zinc-950">
            <h1 className="font-bold text-zinc-50">TOTAL LABORATORIES</h1>
            <p className="text-[32px] text-center text-zinc-50 mt-3">{totalLectures}</p>
          </Card>
        ) : null}
      </Flex>

      {IS_TEACHER ? (
        <Flex direction="column" className="w-full mt-5">
          <h1 className="font-bold text-lg mb-2 ">Lectures</h1>
          <div className="mx-auto w-full max-w-[1000px]">
            <AliceCarousel
              renderPrevButton={() => <button className="text-zinc-950 text-5xl">‹</button>}
              renderNextButton={() => <button className="text-zinc-950 text-5xl">›</button>}
              mouseTracking
              items={items}
              responsive={{
                0: { items: 1 },
                600: { items: 1 },
                800: { items: 2 },
                1024: { items: 3 },
                1200: { items: 3 },
                1980: { items: 3 },
              }}
              controlsStrategy="responsive"
              disableDotsControls
              infinite
              autoPlay
              autoPlayInterval={2000}
            />
          </div>
        </Flex>
      ) : null}

      <Flex gap="5" className="!hidden">
        <Card className="w-1/2 !py-3 !px-7">
          <h1 className="font-bold">TOTAL STUDENTS</h1>
          <p className="text-[32px] text-center mt-3">-</p>
        </Card>
      </Flex>
    </Flex>
  );
};

export default OverviewPage;
