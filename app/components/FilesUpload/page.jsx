"use client";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { storage } from "../../../firebase";
import { motion } from "framer-motion";
import "./fileupload.css";
import "material-icons/iconfont/material-icons.css";

const FilesUpload = () => {
  const [fileUrls, setfileUrls] = useState([]);

  const ListRef = ref(storage, "files/");

  const handleFileUpload = async (file) => {
    // const storageRef = ref(storage, file.name);
    if (file == null) return;
    const storageRef = ref(storage, `files/${file}`);
    await uploadBytes(storageRef, file).catch((error) => {
      console.error(error);
    });
    console.log("File uploaded successfully");
    alert("File uploaded successfully");
  };
  // const getFileUrl = async (fileName) => {
  // const storageRef = ref(storage, `files/${fileName}`);
  // const url = await getDownloadURL(storageRef);
  // console.log(`File URL: ${url}`);
  // return url;
  useEffect(() => {
    listAll(ListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setfileUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  // };

  // const [file, setFile] = useState();
  // const fileRef = useRef();

  const variants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // File drag new
  // Drag and drop, or browse your files
  const [isDragOver, setIsDragOver] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const fileRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    // Process dropped files here
    handleFileSelect(files[0]);
  };

  const handleClick = () => {
    // fileInputRef.current.click();
    fileRef.current.click();
  };

  const handleFileSelect = (file) => {
    setFile(file);
    // Process selected file here
    console.log(file);
  };

  return (
    <motion.div
      className="bg-black min-h-screen w-full text-white p-3 py-10 md:p-10 md:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-[50vw]">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl mb-10 font-semibold font-serif"
        >
          FilesUpload
        </motion.div>
        {/* <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input ref={fileRef} type="file" />
        </motion.div> */}
        <div
          className={`file-drop-container ${isDragOver ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* {selectedFile ? (
            <div className="file-name">{selectedFile.name}</div>
          ) : ( */}
          {file ? (
            <div className="file-name">{file.name}</div>
          ) : (
            <div>
              {/* <BiArrowFromBottom size={45} /> */}
              <span class="material-icons" style={{ fontSize: "3vw" }}>
                upload
              </span>
              <div className="file-drop-message" style={{ fontSize: "1.66vw" }}>
                Drag and drop, or
                <div
                  className="inline"
                  style={{
                    color: "#0078AD",
                    marginLeft: "0.333vw",
                    marginRight: "0.333vw",
                  }}
                  onClick={handleClick}
                >
                  browse
                </div>
                your files
              </div>
            </div>
          )}
          <input
            type="file"
            // ref={fileInputRef}
            ref={fileRef}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* <button
            className="mx-auto my-5 bg-white block text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-xl cursor-pointer"
            onClick={() => {
              setFile(fileRef.current.value);
            }}
          >
            Upload
          </button> */}
          <motion.button
            onClick={() => {
              handleFileUpload(file);
            }}
            className="mx-auto my-5 bg-white block text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-xl cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Submit
          </motion.button>
        </motion.div>
      </div>
      <div className="mx-auto">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-5xl mb-10 font-semibold font-serif"
          >
            Preview files here
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={variants}>
            {fileUrls.map((url, index) => (
              <div key={index}>
                <a href={url} target="_blank" rel="noreferrer">
                  File {index + 1}
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilesUpload;
