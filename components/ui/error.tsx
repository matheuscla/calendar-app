import { CircleAlertIcon } from "lucide-react";
import React from "react";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-sm text-red-500 mt-2 flex gap-1 items-center">
      <CircleAlertIcon className="w-4 h-4" />
      {message}
    </div>
  );
}
