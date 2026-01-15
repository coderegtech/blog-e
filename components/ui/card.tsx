export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={["border-2 border-black  relative p-4", className].join(" ")}
      style={{
        boxShadow: "5px 5px 0px #000",
      }}
    >
      <div className="bg-white z-20">{children}</div>
    </div>
  );
};
