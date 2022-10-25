import { FunctionComponent, useState } from "react";

type UsernameInputProps = {
  onConfirm: (name: string) => void;
};
export const UsernameInput: FunctionComponent<UsernameInputProps> = ({ onConfirm }) => {
  const [input, setInput] = useState<string>("");

  return (
    <div
      className="h-screen w-screen bg-slate-100 items-center  justify-center flex text-gray-800 flex-col  font-mono"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onConfirm(input);
        }
      }}
    >
      <div className=" text-4xl flex flex-col h-2/3 justify-center items-baseline">
        <label className="my-4 text-2xl" htmlFor="username">
          Type your username:
        </label>
        <input
          className="p-2 rounded-md text-gray-700"
          autoFocus
          type="text"
          name="username"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
      </div>
      <div className="h-1/3 w-full flex justify-center text-lg">
        {input?.trim()?.length > 0 && <p className=" animate-bounce">Press enter when ready.</p>}
      </div>
    </div>
  );
};
