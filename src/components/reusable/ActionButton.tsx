import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../../ui/button";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

const ActionButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ActionButtonProps) => {
  const baseClass = "w-full sm:w-auto h-11 rounded-lg px-6 gap-2";

  const variantClass =
    variant === "primary"
      ? "bg-[#465FFF] text-white hover:bg-[#3648d8] px-1"
      : "border border-border text-foreground hover:bg-muted";

  return (
    <Button
      type="button"
      variant={variant === "outline" ? "outline" : undefined}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
