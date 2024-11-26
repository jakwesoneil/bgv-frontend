import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Button, Table, Badge, Dialog, Text, TextField } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useAccountsService } from "@/services";

const ManageAccountsPage: React.FC = () => {
  const { getAccounts, createAccount, updateAccount, deleteAccount } = useAccountsService();
  const { accountType } = useParams<{ accountType: "teacher" | "student" }>();

  const [data, setData] = React.useState<any>([]);
  const [showDetail, setShowDetail] = React.useState<any>({
    open: false,
    data: null,
  });
  const [newAccount, setNewAccount] = React.useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const [editAccount, setEditAccount] = React.useState<any>({
    id: null,
    name: "",
    email: "",
    password: "",
  });

  const onInputNewAccount = (key: string, value: string) => {
    setNewAccount({
      ...newAccount,
      [key]: value,
    });
  };

  const onInputEditAccount = (key: string, value: string) => {
    setEditAccount({
      ...editAccount,
      [key]: value,
    });
  };

  const onCreateAccount = async (e: any) => {
    e.preventDefault();
    return await createAccount({ ...newAccount, account_type: accountType }).then(() => {
      getAccounts(accountType).then((data) => setData(data));
      setNewAccount({
        name: "",
        email: "",
        password: "",
      });
    });
  };

  const onUpdateAccount = async (e: any) => {
    e.preventDefault();

    console.log(editAccount);
    return await updateAccount(editAccount.id, { ...editAccount, account_type: accountType }).then(() => {
      getAccounts(accountType).then((data) => setData(data));
      setEditAccount({
        id: null,
        name: "",
        email: "",
        password: "",
      });
    });
  };

  const resetShowDetail = () => {
    setShowDetail({
      show: false,
      data: null,
    });
  };

  const onShowDetails = (accountDetails: any) => {
    setEditAccount({ ...accountDetails, id: +accountDetails.id });
    setShowDetail({
      show: true,
      data: accountDetails,
    });
  };

  const onDeleteAccount = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteAccount(id).then(() => {
        getAccounts(accountType).then((data) => setData(data));
      });
    }
  };

  React.useEffect(() => {
    getAccounts(accountType).then((data) => setData(data));
  }, [accountType]);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Accounts" subtitle="View all and manage user accounts">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button className="text-xs" color="blue" variant="classic">
              Add account
            </Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add account</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Please provide account details.
            </Dialog.Description>

            <form onSubmit={onCreateAccount}>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Root type="text" placeholder="Enter full name" onChange={(e) => onInputNewAccount("name", e.target.value)} required />
                </label>

                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Root type="email" placeholder="Enter email" onChange={(e) => onInputNewAccount("email", e.target.value)} required />
                </label>

                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Password
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => onInputNewAccount("password", e.target.value)}
                    required
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button type="submit">Save</Button>
                </Dialog.Close>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </PageHeader>

      <Flex direction="column" gap="2">
        <Table.Root>
          <Table.Header>
            <Table.Row className="border-t border-b border-zinc-900">
              <Table.ColumnHeaderCell className="text-zinc-900">Account Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">E-mail</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length ? (
              data.map((d: any) => (
                <Table.Row key={d.id}>
                  <Table.RowHeaderCell className="text-zinc-900">
                    <Badge color="blue" variant="solid" className="!uppercase">
                      {d.account_type}
                    </Badge>
                  </Table.RowHeaderCell>
                  <Table.RowHeaderCell className="text-zinc-900">{d.name}</Table.RowHeaderCell>
                  <Table.RowHeaderCell className="text-zinc-900">{d.email}</Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="row" gap="2">
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button className="text-xs" color="blue" variant="classic" onClick={() => onShowDetails(d)}>
                            Edit account
                          </Button>
                        </Dialog.Trigger>

                        {showDetail.show && showDetail.data ? (
                          <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Edit account</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                              Make changes to the account details.
                            </Dialog.Description>

                            <form onSubmit={onUpdateAccount}>
                              <Flex direction="column" gap="3">
                                <label>
                                  <Text as="div" size="2" mb="1" weight="bold">
                                    Name
                                  </Text>
                                  <TextField.Root
                                    type="text"
                                    defaultValue={showDetail.data.name}
                                    placeholder="Enter full name"
                                    onChange={(e) => onInputEditAccount("name", e.target.value)}
                                  />
                                </label>

                                <label>
                                  <Text as="div" size="2" mb="1" weight="bold">
                                    Email
                                  </Text>
                                  <TextField.Root
                                    type="email"
                                    defaultValue={showDetail.data.email}
                                    placeholder="Enter email"
                                    onChange={(e) => onInputEditAccount("email", e.target.value)}
                                  />
                                </label>

                                <label>
                                  <Text as="div" size="2" mb="1" weight="bold">
                                    New Password
                                  </Text>
                                  <TextField.Root
                                    type="password"
                                    placeholder="Enter new password"
                                    onChange={(e) => onInputEditAccount("password", e.target.value)}
                                  />
                                </label>
                              </Flex>

                              <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                  <Button variant="soft" color="gray" onClick={resetShowDetail}>
                                    Cancel
                                  </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                  <Button type="submit">Update</Button>
                                </Dialog.Close>
                              </Flex>
                            </form>
                          </Dialog.Content>
                        ) : null}
                      </Dialog.Root>

                      <Button className="text-xs" color="red" variant="classic" onClick={() => onDeleteAccount(d.id)}>
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
    </Flex>
  );
};

export default ManageAccountsPage;
