import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Card, Badge } from "@radix-ui/themes";
import { PageHeader, LaboratorySubmissions } from "@/components";
import { useLecturesService } from "@/services";
import { useAuth } from "@/hooks";
import { APP_URL } from "@/constants";

const ManageLecturesPage: React.FC = () => {
  const { getLaboratorySubmissions, getTeacherLaboratories, deleteLecture } = useLecturesService();
  const { currentUserId } = useAuth();

  const [data, setData] = React.useState([]);
  const [selectedLab, setSelectedLab] = React.useState<any>({
    laboratoryId: null,
    laboratoryTitle: "",
    data: null,
  });

  const onViewSubmissions = (laboratoryId: number, laboratoryTitle: string) => {
    getLaboratorySubmissions(+laboratoryId).then((data) => {
      setSelectedLab({
        laboratoryId,
        laboratoryTitle,
        data: data,
      });
    });
  };

  const onResetViewSubmission = () => {
    setSelectedLab({
      laboratoryId: null,
      laboratoryTitle: "",
      data: null,
    });
  };

  const fetchLectures = async () => {
    await getTeacherLaboratories(+currentUserId!).then((data) => setData(data));
  };

  const confirmDeleteLecture = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteLecture(id).then(() => fetchLectures());
    }
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  const getQuestionsData = (questions: string) => {
    if (!questions) return "No";

    const parsedQuestions = JSON.parse(questions);

    return `Yes - (${parsedQuestions.length} question(s))`;
  };

  const renderLabLinks = (labs: any) => {
    if (labs) {
      const parsedLabs = JSON.parse(labs);

      return parsedLabs.map((lab: any) => (
        <a href={lab.url} key={`lab-link-${lab.url}`} className="text-blue-600 underline text-xs" target="_blank">
          {lab.url}
        </a>
      ));
    }

    return <></>;
  };

  React.useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Laboratories" subtitle="View all and manage laboratories">
        <Link to="/dashboard/manage/laboratories/add">
          <Button color="blue">Add Laboratory</Button>
        </Link>
      </PageHeader>

      {selectedLab.laboratoryId ? (
        <LaboratorySubmissions title={selectedLab.laboratoryTitle} data={selectedLab.data} onClose={onResetViewSubmission} />
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.length ? (
          data.map((d: any) => (
            <Card key={d.id} className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
              <Badge>Week #{d.week_no}</Badge>
              <h1 className="font-bold mt-2">{d.title}</h1>
              <p className="text-[14px] mt-2">{d.description}</p>
              <div className="mt-3">
                <a href={getModuleSrcUrl(d.module_src)} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  Laboratory Instruction (Click to view)
                </a>
              </div>
              <div className="mt-3">
                <small>Links for laboratories</small>
                <Flex gap="2">{d.labs ? renderLabLinks(d.labs) : null}</Flex>
              </div>
              <p className="mt-2 justify-center">Has Assessment Quiz? {getQuestionsData(d.questions)}</p>
              <div className="mt-3 flex justify-center gap-2">
                <Link to={`/dashboard/manage/laboratories`}>
                  <Button className="text-xs" color="green" variant="soft" onClick={() => onViewSubmissions(d.id, d.title)}>
                    View Submissions
                  </Button>
                </Link>
                <Link to={`/dashboard/manage/laboratories/${d.id}/edit`}>
                  <Button className="text-xs" color="blue" variant="soft">
                    Update
                  </Button>
                </Link>
                <Button className="text-xs" color="red" onClick={() => confirmDeleteLecture(d.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="col-span-2 text-center font-bold shadow">NO DATA</Card>
        )}
      </div>
    </Flex>
  );
};

export default ManageLecturesPage;
