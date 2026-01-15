import { DeletePostModal, EditPostModal } from "@/components/CustomModals";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DeletePostModal />
      <EditPostModal />
      {children}
    </>
  );
};
