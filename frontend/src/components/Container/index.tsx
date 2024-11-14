interface ContainerProps {
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  width = "md",
  className = "",
}) => {
  const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  };

  return (
    <div className={`${className} w-full mx-auto ${widths[width]}`}>
      {children}
    </div>
  );
};

export default Container;
