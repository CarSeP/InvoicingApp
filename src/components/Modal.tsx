import { Dialog, DialogTitle } from "@mui/material";

interface Props {
  title: string;
  showModal: boolean,
  children: React.ReactNode;
}

function ModalComponent({ title, showModal ,children }: Props) {
  return (
    <Dialog open={showModal}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}

export default ModalComponent;
