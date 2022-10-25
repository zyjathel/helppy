import React, { FunctionComponent } from "react";
import classNames from "classnames";

export const BoardSlot: FunctionComponent<{ text: string; marked: boolean }> = ({ text, marked }) => {
  return <div className={classNames(" p-2", marked ? "bg-green-200" : "bg-gray-100")}>{text}</div>;
};
