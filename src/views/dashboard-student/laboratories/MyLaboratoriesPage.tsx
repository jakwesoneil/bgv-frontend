import React from "react";
import { format } from "date-fns";
import { Flex, Callout, Card, Badge } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { useAuth } from "@/hooks";

const MyLaboratoriesPage: React.FC = () => {
  const { getMyLaboratories } = useLecturesService();
  const { currentUserId } = useAuth();

  const [data, setData] = React.useState<any>([]);

  const formatDate = (dateStr: string) => {
    return format(dateStr, "MMMM dd yyyy hh:mm a");
  };

  React.useEffect(() => {
    getMyLaboratories(currentUserId!).then((data) => setData(data));
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="My Laboratories" subtitle="View all submitted laboratories" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.length ? (
          data.map((d: any) => (
            <Card key={d.id} className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
              <Badge className="mr-2">Taken at - {formatDate(d.created_at)}</Badge>
              <Badge color="amber">Week # {d.lecture?.week_no}</Badge>
              <Flex gap="3" className="!w-full pt-5">
                <Flex direction="column" gap="5" className="!w-full">
                  <Flex direction="column" gap="0">
                    <small>Title</small>
                    <h1 className="font-bold text-xl">{d.lecture?.title}</h1>
                  </Flex>

                  <Flex direction="column" gap="0">
                    <small>Description</small>
                    <p className="text-[12px]">{d.lecture?.description}</p>
                  </Flex>
                </Flex>
                <Flex direction="column" gap="2" className="!w-full">
                  <p className="text-[12px]">Quiz Score</p>
                  <h1>{d.quiz_score}</h1>
                </Flex>
              </Flex>
            </Card>
          ))
        ) : (
          <Callout.Root color="blue" variant="soft">
            <Callout.Text className="text-center">You have no submissions yet</Callout.Text>
          </Callout.Root>
        )}
      </div>
    </Flex>
  );
};

export default MyLaboratoriesPage;
