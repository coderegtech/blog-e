import { Card } from "./card";

const Modal = ({
  isOpen,
  className,
  children,
}: {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={`absolute inset-0 bg-black/20 flex justify-center items-center z-50`}
    >
      <Card className={["max-w-sm  w-full bg-white z-50", className].join()}>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
