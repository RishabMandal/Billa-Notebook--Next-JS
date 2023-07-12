"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import Alert from "../Alert";
import { motion } from "framer-motion";
import { TbFileSearch } from "react-icons/tb";
import { MdImageSearch, MdOutlineContentCopy } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Pacifico } from "next/font/google";
import { Poppins } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
// const pacifico = Poppins({ subsets: ["latin"], weight: "400" });

const LandingPage = () => {
  const inputRef = useRef<any>();
  const [textNotes, setTextNotes] = useState<any>();
  const [textareaNotes, setTextareaNotes] = useState<any>();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getDocs(collection(db, "notes"));
        // let data;
        console.log(data.docs.map((doc) => doc.data()));
        setTextNotes(data.docs.map((doc) => doc.data()));
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
    getNotes();
  }, []);

  const submitNotes = async () => {
    // console.log("Clicked");
    // console.log(textNotes);
    console.log(textareaNotes);
    const docRef = doc(db, "notes", "HsJ8NLbbkjzmRPHqRIZA");
    await updateDoc(docRef, {
      date: "11-03-2023",
      //   notepad: textNotes[0].notepad,
      notepad: textareaNotes,
    })
      .then((docRef) => {
        alert("Uploaded successfully!");
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  useEffect(() => {
    if (textNotes) inputRef.current.value = textNotes[0]?.notepad;
  }, [textNotes]);

  useEffect(() => {
    submitNotes();
  }, [textareaNotes]);

  const [fontsize, setFontsize] = useState("text-2xl");

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Hover on buttons
  // const [expanded, setExpanded] = useState(false);

  // const handleHover = () => {
  //   setExpanded(!expanded);
  // };

  // Alert
  const [open, setOpen] = useState(false);

  // Navbar for smaller screen
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      className="bg-black h-screen w-full text-white p-3 md:p-10"
    >
      <div className="text-5xl md:mb-10 font-semibold flex flex-wrap justify-between">
        <div className="w-fit flex flex-row mt-3 my-6 md:mt-0 mx-auto md:mx-0">
          <img
            className="invert text-red-600 w-fit h-[3rem] hover:rotate-180 duration-200"
            src="https://img.icons8.com/pastel-glyph/64/000000/cat-back-view.png"
            alt=""
          />
          {/* <div className="w-fit hidden sm:inline-block">-</div> */}
          <div className={`w-fit ml-5 ${pacifico.className}`}>PowerBilla</div>
        </div>
        <div
          className={`w-fit text-4xl hidden lg:block md:mb-5 ${pacifico.className}`}
        >
          Experience the Best Notebook
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        {/* Buttons For bigger screen  */}
        <div className="hidden md:block md:w-fit z-10 mx-auto md:mr-10 h-fit">
          <div className="flex flex-row justify-evenly">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                onClick={() => {
                  setFontsize("text-lg");
                  window?.navigator?.vibrate?.(125);
                }}
                stroke="currentColor"
                className="w-12 h-12 hover:scale-75 transition ease-in"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            </button>
            {/* <div className="font-semibold text-2xl">Zoom</div> */}
            <motion.button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                onClick={() => {
                  setFontsize("text-4xl");
                  window?.navigator?.vibrate?.(125);
                }}
                stroke="currentColor"
                className="w-12 h-12 hover:scale-125 ml-5 cursor-pointer transition ease-in"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => alert("Coming soon....")}
            // onMouseEnter={handleHover}
            // onMouseLeave={handleHover}
            className="bg-white my-5 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
          >
            <Link href="/components/FilesUpload">
              {/* <Link href="/components/FilesUpload">View uploaded files</Link> */}
              <TbFileSearch
                size={40}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
              {/* {expanded && (
                <div className="expand-content duration-300">
                  <p>View uploaded files</p>
                </div>
              )} */}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="bg-white block sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
          >
            <Link href="/components/ImageUpload">
              {/* <Link href="/components/ImageUpload">View uploaded images</Link> */}
              <MdImageSearch
                size={40}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="bg-white mt-5 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
            onClick={() => {
              setTextareaNotes(inputRef.current.value);
              window?.navigator?.vibrate?.(125);
            }}
          >
            {/* Upload this note */}
            <BsUpload
              size={40}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="bg-white mt-5 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(inputRef.current.value);
              setOpen(true);
              window?.navigator?.vibrate?.(125);
            }}
          >
            {/* Copy this note */}
            <MdOutlineContentCopy
              size={40}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </motion.div>
          <Alert open={open} setOpen={setOpen} title="Copied to Clipboard!" />
        </div>
        {/* Buttons for smaller screen  */}
        <div className="fixed bottom-10 left-5 md:hidden z-10 mx-auto">
          {openNavbar && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="flex flex-row justify-evenly">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    onClick={() => {
                      setFontsize("text-lg");
                      window?.navigator?.vibrate?.(125);
                    }}
                    stroke="currentColor"
                    className="w-9 h-9 hover:scale-75 transition ease-in"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                    />
                  </svg>
                </button>
                {/* <div className="font-semibold text-2xl">Zoom</div> */}
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    onClick={() => {
                      setFontsize("text-4xl");
                      window?.navigator?.vibrate?.(125);
                    }}
                    stroke="currentColor"
                    className="w-9 h-9 hover:scale-125 ml-5 cursor-pointer transition ease-in"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </button>
              </div>
              <div
                onClick={() => alert("Coming soon....")}
                // onMouseEnter={handleHover}
                // onMouseLeave={handleHover}
                className="bg-white my-3 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
              >
                <Link href="/components/FilesUpload">
                  {/* <Link href="/components/FilesUpload">View uploaded files</Link> */}
                  <TbFileSearch
                    size={30}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                  {/* {expanded && (
                <div className="expand-content duration-300">
                  <p>View uploaded files</p>
                </div>
              )} */}
                </Link>
              </div>
              <div className="bg-white block sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer">
                <Link href="/components/ImageUpload">
                  {/* <Link href="/components/ImageUpload">View uploaded images</Link> */}
                  <MdImageSearch
                    size={30}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                </Link>
              </div>
              <div
                className="bg-white mt-3 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
                onClick={() => {
                  setTextareaNotes(inputRef.current.value);
                  window?.navigator?.vibrate?.(125);
                }}
              >
                {/* Upload this note */}
                <BsUpload
                  size={30}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </div>
              <div
                className="bg-white mt-3 sticky z-20 text-black rounded-full font-bold border-2 border-gray-800 hover:border-white hover:bg-black hover:text-white transition ease-in px-4 py-3 text-2xl cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(inputRef.current.value);
                  // alert("Clipboard has been updated");
                  setOpen(true);
                  window?.navigator?.vibrate?.(125);
                }}
              >
                <MdOutlineContentCopy
                  size={30}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </div>
            </motion.div>
          )}
          <Alert open={open} setOpen={setOpen} title="Copied to Clipboard!" />
          <div className="mt-3 flex flex-row items-center">
            <div onClick={() => setOpenNavbar(!openNavbar)}>
              <CgMoreO size={30} />
            </div>
            {openNavbar && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                <Link
                  href="/components/Settings"
                  className="text-white block bg-transparent w-fit h-fit ml-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9 cursor-pointer hover:rotate-90 duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
        <textarea
          className={`bg-black h-[84vh] md:mt-1 md:h-[83vh] outline-none text-left overflow-hidden hover:overflow-y-scroll md:sticky md:top-10 border-2 ${fontsize} p-3 mb-8 md:m-0 md:p-10 w-full rounded-xl`}
          ref={inputRef}
          placeholder="Enter new notes here..."
          rows={30}
        />
      </div>
    </motion.div>
  );
};

export default LandingPage;
