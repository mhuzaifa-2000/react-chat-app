import React from "react";

export const Message = (props) => {
  return (
    <div className="max-w-full mx-10  border-t border-b p-5">
      <div className="font-medium underline text-md text-purple-900 mb-1">
        {props.email}
      </div>
      <div>
        <p className="text-blue-900 font-medium">{props.text}</p>
      </div>
    </div>
  );
};
