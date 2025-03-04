"use client";

import TableComponent from "@/components/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("/api/users");
    setUsers(response.data.users)
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div>
      <TableComponent data={users} />
    </div>
  );
}

export default UsersPage;
