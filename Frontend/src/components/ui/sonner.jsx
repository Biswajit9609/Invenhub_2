import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="light"  // or "dark" or "system"
      className="toaster"
      style={{
        "--normal-bg": "#ffffff",  // Example color
        "--normal-text": "#000000",
        // "--normal-border": "#cccccc",
      }}
      {...props}
    />
  );
};

export { Toaster };
