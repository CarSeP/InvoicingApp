import { Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

function NoDataMessageComponent() {
  return (
    <div className="max-w-md mx-auto text-center p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <InboxIcon className="text-6xl text-gray-400" />
        <Typography variant="h6" color="text.secondary">
          No data available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No data found to display at this time.
        </Typography>
      </div>
    </div>
  );
}

export default NoDataMessageComponent;
