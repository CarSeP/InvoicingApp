"use client";

import TableComponent from "@/components/Table";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useFetch, State } from "@/hooks/useFetch";
import { useState } from "react";
import UserManagerComponent from "@/components/UserManager";
import LoaderComponent from "@/components/Loader";
import ErrorMessageComponent from "@/components/ErrorMessage";

const URL = "/api/users";

function UsersPage() {
  const { data, state } = useFetch(URL);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  if (state == State.Loading) {
    return <LoaderComponent />;
  }

  if (state == State.Error) {
    return <ErrorMessageComponent />;
  }

  return (
    <section>
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add User
        </Button>
      </header>
      <TableComponent data={data} />
      <UserManagerComponent showModal={showModal} closeModal={closeModal} />
    </section>
  );
}

export default UsersPage;
