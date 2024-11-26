import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Flex, Card, Button, TextArea, TextField, Callout, Spinner } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { useAuth } from "@/hooks";
import { APP_URL } from "@/constants";

const TakeLaboratoryPage: React.FC = () => {
  const { getLecture, submitLaboratory } = useLecturesService();
  const { id } = useParams<{ id: string }>();
  const { currentUserId } = useAuth();

  const [data, setData] = React.useState<any>(null);
  const [questions, setQuestions] = React.useState<any>(null);
  const [labs, setLabs] = React.useState<any>(null);
  const [labFiles, setLabFiles] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  const checkQuizScore = () => {
    const correctAnswers = questions.filter((question: any) => question.isCorrect).length;

    return `${correctAnswers}/${questions.length}`;
  };

  const onAddLabSubmission = (index: number, file: File) => {
    const labFilesCopy = [...labFiles];

    if (labFilesCopy[index]) {
      labFilesCopy[index] = file;
    } else {
      labFilesCopy.push(file);
    }

    setLabFiles(labFilesCopy);
  };

  const onAddQuestionAnswer = (index: number, key: string, value: any) => {
    const questionsCopy = [...questions];
    questionsCopy[index][key] = value;

    if (questionsCopy[index].answer.toLowerCase() === value.toLowerCase()) {
      questionsCopy[index].isCorrect = true;
    } else {
      questionsCopy[index].isCorrect = false;
    }

    setQuestions(questionsCopy);
  };

  const checkLabSubmissionContent = () => {
    const flagError = labFiles.length === 0 || questions.filter((question: any) => !question.submittedAnswer).length > 0;

    console.log(labFiles.length === 0);
    console.log(questions.filter((question: any) => !question.submittedAnswer).length > 0);

    return flagError;
  };

  const onSubmitLaboratory = async () => {
    if (checkLabSubmissionContent()) {
      toast.warning("Laboratory submission contents/data must be complete");
      return;
    }

    setLoading(true);

    const quiz_score = checkQuizScore();
    const formData = {
      user_id: currentUserId,
      lecture_id: +id!,
      questions: JSON.stringify(questions),
      quiz_score,
      lab_files: labFiles,
    };

    return await submitLaboratory(formData, setLoading);
  };

  const createPreviewURL = (file: File) => {
    const previewURL = URL.createObjectURL(file);

    return previewURL;
  };

  React.useEffect(() => {
    if (id) {
      getLecture(+id!).then((data) => {
        setData(data);

        if (data.questions) {
          setQuestions(JSON.parse(data.questions));
        }

        if (data.labs) {
          setLabs(JSON.parse(data.labs));
        }
      });
    }
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="View Laboratory Details" subtitle="View laboratory detail" />

      <Card className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
        {loading ? (
          <Spinner size="3" />
        ) : data ? (
          <Flex direction="column" gap="2">
            <Flex direction="column" gap="2">
              <Flex direction="row" gap="2">
                <small>Laboratory #</small>
                <small>{data.week_no}</small>
              </Flex>
              <Flex direction="row" gap="2">
                <small>Laboratory Name</small>
                <small>{data.title}</small>
              </Flex>
            </Flex>

            <Flex direction="row" gap="2">
              <small>Laboratory Description</small>
              <small>{data.description}</small>
            </Flex>

            <Flex direction="row" gap="2">
              <small>View PDF Instructions</small>
              <Button variant="soft" color="blue">
                <a href={getModuleSrcUrl(data.module_src)} target="_blank" className="text-sm text-blue-500 underline">
                  View PDF
                </a>
              </Button>
            </Flex>

            <hr />

            <Flex gap="7" className="!h-full">
              <Flex direction="column" gap="3" className="!w-full border-r border-gray-700 pr-8">
                {questions.length ? (
                  questions.map((question: any, index: number) => (
                    <Flex gap="3" key={`question-${index}`} className="!w-full">
                      <Flex direction="column" gap="2" className="!w-1/3">
                        <small>Question</small>
                        <p>{question.question}</p>
                      </Flex>
                      <Flex direction="column" gap="2" className="!w-2/3">
                        <small>Your Answer</small>
                        <TextArea placeholder="Enter your answer" onChange={(e) => onAddQuestionAnswer(index, "submittedAnswer", e.target.value)} />
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Callout.Root color="blue" variant="soft">
                    <Callout.Text className="text-center">No questions content</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>

              <Flex direction="column" gap="8" className="!w-full">
                {labs.length ? (
                  labs.map((lab: any, index: number) => (
                    <Flex gap="3" key={`lab-${index}`} className="!w-full">
                      <div className="!w-1/3">
                        <p className="text-[11px]">Laboratory environment # {index + 1}</p>
                        <Button variant="soft" color="blue">
                          <a href={lab.url} className="text-blue-600 underline" target="_blank">
                            View Lab
                          </a>
                        </Button>
                      </div>

                      <Flex direction="column" gap="3" className="!w-2/3">
                        {/* <small>Add laboratory build link (optional)</small>
                        <TextField.Root
                          type="text"
                          className="w-full"
                          placeholder="Add laboratory build link (optional)"
                          onChange={(e) => onAddLabSubmission(index, "link", e.target.value)}
                        /> */}

                        <small>Upload output screenshot (required)</small>
                        <TextField.Root
                          // @ts-ignore
                          type="file"
                          className="w-full"
                          // @ts-ignore
                          onChange={(e) => onAddLabSubmission(index, e.target.files[0])}
                          required
                        />
                        {labFiles[index] ? (
                          <img src={createPreviewURL(labFiles[index])} alt="output-preview" className="h-[200px] w-[300px]" />
                        ) : null}
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Callout.Root color="blue" variant="soft">
                    <Callout.Text className="text-center">No labs yet</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Flex>
          </Flex>
        ) : null}

        <Flex justify="center" className="mt-8">
          <Button color="green" size="3" onClick={onSubmitLaboratory}>
            Submit My Laboratory
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default TakeLaboratoryPage;
