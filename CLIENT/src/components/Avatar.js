import React from "react";
import userIcon from "./../imgs/user.svg";

const Avatar = ({ type = "tec", label }) => {
  let avatarStyle =
    "flex items-center justify-center rounded-full h-10 w-10 text-white";

  if (type === "tec") {
    avatarStyle += " bg-gray-400";
  } else if (type === "adm") {
    avatarStyle += " bg-red-800";
  } else if (type === "gm") {
    avatarStyle += " bg-black";
  }

  return (
    <div className="flex items-center sm:flex-col">
      <div className={`${avatarStyle} flex flex-col`}>
        {type === "tec" && (
          <img src={userIcon} alt="User Icon" className="h-4 w-4" />
        )}
        {type === "adm" && (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 4v16m8-8H4"
            />
          </svg>
        )}
        {type === "gm" && (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.367 10.367A9 9 0 1110 2.83V1m4 8l2.5 2.5m0 0L19 11m1.53-5.797a5 5 0 00-9.057 3.176M1 22h2a2 2 0 002-2v-3h12v3a2 2 0 002 2h2m-2-8.996a5.99 5.99 0 00-2.944-5.158m-3.464-1.273a5.992 5.992 0 00-7.576 7.576m-1.273 3.464a5.99 5.99 0 005.158 2.944m3.464 1.273a5.992 5.992 0 007.576-7.576"
            />
          </svg>
        )}
        <p className="mt-0 text-xs">{type}</p>
      </div>
      {type !== "gm"  && (
        <div>
          <div className="pl-2 text-white block sm:hidden">{label}</div>
          <div className="pl-2 text-xs text-white hidden sm:block">{label}</div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
