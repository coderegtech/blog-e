export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={[
        "border-2 border-black  relative p-4",
        "min-h-[calc(100dvh)] sm:min-h-fit max-w-xl w-full bg-white overflow-hidden",
        className,
      ].join(" ")}
      style={{
        boxShadow: "5px 5px 0px #000",
      }}
    >
      <div className="bg-white z-20">{children}</div>
    </div>
  );
};
