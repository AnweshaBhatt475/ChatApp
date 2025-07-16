import React from "react";
import { format } from "date-fns";
import { FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const MessageItem = ({ message, isOwnMessage, onDelete }) => {
  const showTime = format(new Date(message.createdAt), "hh:mm a");

  const handleDelete = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/delete-message`;
      const res = await axios.post(URL, {
        messageId: message._id,
        userId: message.sender,
      });
      toast.success("Message deleted");
      onDelete(res.data.data); // update frontend state
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div
      className={`max-w-[70%] p-2 rounded-lg my-1 text-sm relative ${
        isOwnMessage ? "ml-auto bg-blue-100" : "bg-gray-100"
      }`}
    >
      <p>{message.text}</p>

      <div className="flex justify-end gap-1 items-center text-gray-500 text-xs mt-1">
        <span>{showTime}</span>

        {isOwnMessage && (
          <span>
            {message.seen ? (
              <FaCheckDouble className="text-blue-500" size={12} />
            ) : (
              <FaCheck className="text-green-500" size={12} />
            )}
          </span>
        )}

        {isOwnMessage && !message.isDeleted && (
          <button onClick={handleDelete}>
            <FaTrash className="ml-1 text-red-500 hover:text-red-700" size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
