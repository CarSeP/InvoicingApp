import ModalComponent from "./Modal";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel, userScheme } from "@/models/user.model";
import { getCookie } from "cookies-next";
import { useState } from "react";

interface props {
  showModal: boolean;
  closeModal: () => void;
}

function UserManagerComponent({ showModal, closeModal }: props) {
  const [errorForm, setErrorForm] = useState(false);
  const authToken = getCookie("auth");
  const { control, handleSubmit, formState: { errors }} = useForm<UserModel>({
    resolver: zodResolver(userScheme),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      role: "User",
      active: true
    }
  });
  const onSubmit: SubmitHandler<UserModel> = async (data) => {
    const headers = {
      Authorization: authToken?.toString() || "",
    };
    try {
      const response = await axios.post("/api/users", data, { headers });
      if (response.status === 200) closeModal();
    } catch {
      setErrorForm(true);
    }
  };

  return (
    <ModalComponent
      title="Add User"
      showModal={showModal}
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 px-4">
        <InputForm
          name="username"
          control={control}
          label="Username"
          type="text"
          error={errors.username}
        />
        <InputForm
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        <SelectForm
          name="role"
          control={control}
          label="Role"
          type="select"
          menuItems={["Admin", "User"]}
          error={errors.role}
        />
        <SelectForm
          name="active"
          control={control}
          label="Active"
          type="select"
          menuItems={[true, false]}
          error={errors.active}
        />
        {errorForm && <p className="text-red-500 text-center">An error has occurred</p>}
        <div className="flex w-full justify-end p-2">
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
          <Button type="button" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </ModalComponent>
  );
}

export default UserManagerComponent;
