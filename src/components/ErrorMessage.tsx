import { Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorMessageComponent() {
  return (
    <div className="max-w-md mx-auto text-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
      <div className="flex flex-col items-center gap-4">
        <ErrorOutlineIcon className="text-6xl text-red-500" />
        <Typography variant="h6" color="error">
          An error has occurred
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </div>
    </div>
  );
}

export default ErrorMessageComponent;
