import { MenuItem, TextField } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any>;
  menuItems: any[];
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ name, control, label, type, error, menuItems }: Props) => {
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
            select
            autoFocus
            fullWidth
            {...field}
          >
            {menuItems &&
              menuItems.map((el) => <MenuItem value={el}>{el.toString()}</MenuItem>)}
          </TextField>
        )}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputForm;
