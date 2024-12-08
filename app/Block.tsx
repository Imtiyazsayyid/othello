import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  cell: string;
  onClick: () => void;
}

const Block = ({ cell, onClick }: Props) => {
  let content = <></>;
  if (cell === "W") {
    content = <div className="h-[80px] w-[80px] bg-white rounded-full"></div>;
  }
  if (cell === "B") {
    content = <div className="h-[80px] w-[80px] bg-black rounded-full"></div>;
  }
  if (cell === "_") {
  }

  return (
    <div
      className={cn(
        "h-[100px] w-[100px] bg-green-900 rounded-xl flex justify-center items-center transition-all",
        cell === "_" && "hover:opacity-80 cursor-pointer"
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default Block;
