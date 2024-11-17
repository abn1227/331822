import { Variant } from "../../types/themes";

interface GlassLoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: Variant;
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loader = ({
  size = "md",
  variant = "primary",
  fullScreen = false,
  text,
  className = "",
}: GlassLoaderProps) => {
  const variants: Record<Variant, string> = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    success: "border-success",
    error: "border-error",
    warning: "border-warning",
    transparent: "border-white",
    background: "border-background",
  };

  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const Spinner = () => (
    <div
      className={`
        relative
        flex
        flex-col
        items-center
        gap-3
        ${className}
      `}
    >
      <div
        className={`
          rounded-full
          border-t-transparent
          animate-spin
          ${sizes[size]}
          ${variants[variant]}
        `}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full" />
      </div>
      {text && (
        <span className={`${textSizes[size]} text-foreground/80`}>{text}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Spinner />
      </div>
    );
  }

  return <Spinner />;
};

export default Loader;
