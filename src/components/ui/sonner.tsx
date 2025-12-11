import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { Leaf, CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg",
          success: "group-[.toaster]:border-success/30 group-[.toaster]:bg-success/5",
          error: "group-[.toaster]:border-destructive/30 group-[.toaster]:bg-destructive/5",
          info: "group-[.toaster]:border-primary/30 group-[.toaster]:bg-primary/5",
          warning: "group-[.toaster]:border-warning/30 group-[.toaster]:bg-warning/5",
        },
      }}
      icons={{
        success: <Leaf className="h-5 w-5 text-success" />,
        error: <XCircle className="h-5 w-5 text-destructive" />,
        info: <Info className="h-5 w-5 text-primary" />,
        warning: <AlertCircle className="h-5 w-5 text-warning" />,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
