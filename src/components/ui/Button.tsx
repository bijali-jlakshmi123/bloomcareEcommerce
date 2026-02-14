import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-500 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40",
    secondary:
      "bg-fuchsia-500 hover:bg-fuchsia-600 text-white focus:ring-fuchsia-500",
    outline:
      "border-2 border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30",
    ghost: "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
