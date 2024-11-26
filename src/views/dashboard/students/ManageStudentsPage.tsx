import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Table } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useStudentsService } from "@/services";

const ManageStudentsPage: React.FC = () => {
  const { deleteStudent } = useStudentsService();

  const [data] = React.useState([]);

  const fetchStudents = async () => {
    // await getStudents().then((data) => setData(data));
  };

  const confirmDeleteStudent = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteStudent(id);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Students" subtitle="View all and manage students" />

      <Table.Root >
        <Table.Header>
          <Table.Row className="border-t border-b border-zinc-900">
            <Table.ColumnHeaderCell className="text-zinc-900">Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">Section</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length ? (
            data.map((d: any) => (
              <Table.Row key={d.id}>
                <Table.RowHeaderCell>{d.title}</Table.RowHeaderCell>
                <Table.Cell>Section</Table.Cell>
                <Table.Cell>
                  <Flex direction="row" gap="2">
                    <Link to={`/dashboard/manage/lectures/${d.id}/edit`}>
                      <Button className="text-xs" color="blue">
                        Update
                      </Button>
                    </Link>
                    <Button  className="text-xs" color="red" onClick={() => confirmDeleteStudent(d.id)}>
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center font-bold text-zinc-900">
                NO DATA
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default ManageStudentsPage;
