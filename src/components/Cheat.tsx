import { FunctionComponent, useEffect, useState } from "react";

export const Cheat: FunctionComponent<{
  onConfirm: (number: number) => void;
  disabled?: boolean;
}> = ({ onConfirm, disabled = false }) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (disabled) {
      setInput("");
    }
  }, [disabled]);

  return (
    <div
      className="flex items-center h-full w-full text-sm"
      onKeyDown={(e) => {
        if (disabled) {
          return;
        }
        if (e.key === "Enter") {
          onConfirm(parseInt(input));
        }
      }}
    >
      <input
        type="number"
        disabled={disabled}
        placeholder="Type a number here"
        className="py-2 px-2 rounded-sm text-gray-800 border-b-2  font-mono border-gray-800 focus:border-none"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        className="bg-yellow-200 px-4 py-2 rounded-sm text-gray-800 disabled:cursor-not-allowed ml-2 disabled:bg-gray-300"
        disabled={disabled}
        onClick={() => {
          onConfirm(parseInt(input));
        }}
      >
        Cheat
      </button>
    </div>
  );
};
