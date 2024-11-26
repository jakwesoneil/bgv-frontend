import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Card, TextField, Select, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useSectionsService } from "@/services";

const SectionFormPage: React.FC = () => {
  const { createSection, getSection, updateSection } = useSectionsService();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = window.location.pathname.includes("edit");
  const buttonLabel = isEdit ? `Update Section` : `Save Section`;

  const [formData, setFormData] = React.useState({
    title: "",
    status: "draft",
  });

  const populateForm = (data: any) => {
    setFormData(data);
  };

  const setValue = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && id) {
      return await updateSection(+id, formData).finally(() => navigate("/dashboard/manage/sections"));
    }

    return await createSection(formData).finally(() => navigate("/dashboard/manage/sections"));
  };

  React.useEffect(() => {
    if (isEdit) {
      getSection(+id!).then((data) => populateForm(data));
    }
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Section Details" subtitle="Manage details of the section" />

      <div className="px-3 mt-8">
        <Card className="bg-zinc-950 mb-4">
          <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Name</small>
              <TextField.Root color="blue" type="text" defaultValue={formData.title} onChange={(v) => setValue("title", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Status</small>
              <Select.Root defaultValue={formData.status} onValueChange={(v) => setValue("status", v)}>
                <Select.Trigger />
                <Select.Content color="blue">
                  <Select.Group>
                    <Select.Item value="published">Published</Select.Item>
                    <Select.Item value="draft">Draft</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <div>
              <Button type="submit" color="green" variant="soft" className="text-xs">
                {buttonLabel}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Flex>
  );
};

export default SectionFormPage;
