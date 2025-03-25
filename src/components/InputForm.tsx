import { TextField } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            margin="dense"
            label={label}
            type={type}
            autoFocus
            fullWidth
            {...field}
          />
        )}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputForm;
