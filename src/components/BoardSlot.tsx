import classNames from "classnames";
import { FunctionComponent } from "react";

export const BoardSlot: FunctionComponent<{ text: string; marked: boolean }> = ({ text, marked }) => {
  return <div className={classNames(" p-2", marked ? "bg-green-200" : "bg-gray-100")}>{text}</div>;
};
