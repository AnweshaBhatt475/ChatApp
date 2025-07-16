import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name = "", imageUrl = "", width = 40, height = 40 }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  const [imgError, setImgError] = useState(false);

  const avatarName = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const bgColor = [
    "bg-slate-200", "bg-teal-200", "bg-red-200", "bg-green-200",
    "bg-yellow-200", "bg-gray-200", "bg-cyan-200", "bg-sky-200", "bg-blue-200",
  ];
  const hash = name ? name.charCodeAt(0) % bgColor.length : 0;
  const isOnline = onlineUser?.includes(userId);

  const showImage = imageUrl?.startsWith("http") && !imgError;

  return (
    <div
      className="text-slate-800 rounded-full font-semibold relative overflow-hidden shadow-sm"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {showImage ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="rounded-full object-cover w-full h-full border border-slate-300 hover:scale-105 transition-transform duration-200"
          onError={() => setImgError(true)}
        />
      ) : avatarName ? (
        <div
          className={`flex justify-center items-center text-lg ${bgColor[hash]} text-slate-700`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} className="text-slate-500" />
      )}

      {isOnline && (
        <div className="absolute bottom-[2px] right-[2px] z-10">
          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          <div className="w-5 h-5 rounded-full absolute top-[-4px] left-[-4px] border border-green-400" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
