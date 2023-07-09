import { Modal } from "@mui/material";
import React from "react";

const Alert = ({ title, open, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Modal className="fixed top-0 left-0" open={open} onClose={handleClose}>
        <div className="p-10 flex flex-row justify-center items-center">
          <div className="mr-5 text-3xl">{title}</div>
          <div
            className="bg-white text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
            onClick={handleClose}
          >
            Ok
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Alert;
