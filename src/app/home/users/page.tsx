"use client";

import TableComponent from "@/components/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddUser from "@/components/AddUserModal";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const getUsers = async () => {
    const authToken = getCookie("auth");
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: authToken?.toString() || "",
      },
    });
    setUsers(response.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <TableComponent data={users} />
      <div className="mt-4">
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add User
        </Button>
      </div>
      <AddUser
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
      />
    </div>
  );
}

export default UsersPage;
