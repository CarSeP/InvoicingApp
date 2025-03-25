import { Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  title: string;
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function ModalComponent({ title, showModal, closeModal, children }: Props) {
  return (
    <Dialog open={showModal}>
      <header className="flex justify-between px-2">
        <DialogTitle>{title}</DialogTitle>
        <div className="flex items-center">
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
      </header>
      {children}
    </Dialog>
  );
}

export default ModalComponent;
