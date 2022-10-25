import { FunctionComponent } from "react";
import { BoardSlot } from "./BoardSlot";

export const Board: FunctionComponent<{ data: (number | null)[]; heading: string; marked: Set<number> }> = ({
  data,
  heading,
  marked,
}) => {
  // an option to render heading can be added
  const columnsCount = heading.length;
  const rowsCount = data.length / columnsCount;

  return (
    <div
      className="grid font-mono"
      style={{ gridTemplateColumns: `1fr `.repeat(columnsCount), gridTemplateRows: `1fr`.repeat(rowsCount) }}
    >
      {data.map((numberOrNull, i) => (
        <BoardSlot
          key={i}
          text={numberOrNull ? numberOrNull.toString() : "Free"}
          marked={numberOrNull ? marked.has(numberOrNull) : true}
        />
      ))}
    </div>
  );
};
