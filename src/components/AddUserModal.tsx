"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ModalComponent from "./Modal";
import { useState } from "react";
import userScheme from "@/libs/schemas/userScheme";
import axios from "axios";
import { getCookie } from "cookies-next";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
}

function AddUserModalComponent({ showModal, handleCloseModal }: Props) {
  const [role, setRole] = useState("User");
  const [active, setActive] = useState("true");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");
    const active = formData.get("active") == "true";
    const params = { username, password, role, active };

    const validatedUser = userScheme.safeParse(params);
    if (!validatedUser.success) {
      setErrors(
        validatedUser.error.issues.reduce(function (acc: any, cur, i) {
          acc[cur.path[0]] = cur.message;
          return acc;
        }, {})
      );
    } else {
      setErrors({});
      const authToken = getCookie("auth");

      const response = await axios.post("/api/users", params, {
        headers: {
          Authorization: authToken?.toString() || "",
        },
      });
    }
  };

  return (
    <ModalComponent title="Agregar Usuario" showModal={showModal}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            name="username"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
          />
          <TextField
            select
            margin="dense"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
            name="role"
            fullWidth
          >
            <MenuItem value={"User"}>{"User"}</MenuItem>
            <MenuItem value={"Admin"}>{"Admin"}</MenuItem>
          </TextField>
          <TextField
            select
            margin="dense"
            value={active}
            onChange={(e) => setActive(e.target.value)}
            label="Active"
            name="active"
            fullWidth
          >
            <MenuItem value={"true"}>{"True"}</MenuItem>
            <MenuItem value={"false"}>{"False"}</MenuItem>
          </TextField>

          {errors.username && (
            <Typography variant="body2" color="red" align="center">
              {errors.username}
            </Typography>
          )}
          {errors.password && (
            <Typography variant="body2" color="red" align="center">
              {errors.password}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
          <Button onClick={() => handleCloseModal()}>Cancel</Button>
        </DialogActions>
      </form>
    </ModalComponent>
  );
}

export default AddUserModalComponent;
