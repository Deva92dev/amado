"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DeleteIcon, Edit, RotateCcwIcon } from "lucide-react";

type btnSize = "default" | "lg" | "sm";
type FormButtonProps = {
  text?: string;
  size?: btnSize;
  className?: string;
};

export const SubmitButton = ({
  className = "",
  size = "lg",
  text = "submit",
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("capitalize", className)}
      size={size}
    >
      {pending ? (
        <>
          <RotateCcwIcon className="mr-4 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <Edit />;
      case "delete":
        return <DeleteIcon />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action Type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <RotateCcwIcon /> : renderIcon()}
    </Button>
  );
};
