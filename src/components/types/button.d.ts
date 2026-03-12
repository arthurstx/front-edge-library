export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  disabled?: boolean;
  handling?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}
