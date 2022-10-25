import { FunctionComponent } from "react";

export const History: FunctionComponent<{ data: number[] }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <p className="text-md">Previous numbers:</p>
      <p className="font-mono italic text-sm">
        {data.map((x, i) => (
          <span key={i}> {x} </span>
        ))}
      </p>
    </div>
  );
};
