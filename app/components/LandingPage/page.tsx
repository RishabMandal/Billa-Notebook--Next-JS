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
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const LandingPage = () => {
  const inputRef = useRef<any>();
  const [textNotes, setTextNotes] = useState<any>();
  const [textareaNotes, setTextareaNotes] = useState<any>();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getDocs(collection(db, "notes"));
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
    console.log("Clicked");
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

  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      className="bg-black h-screen w-full text-white p-3 py-10 md:p-10"
    >
      <div className="text-5xl mb-10 font-semibold flex flex-wrap justify-between">
        <div className="w-fit flex flex-row mt-7 md:mt-0 mx-auto md:mx-0">
          <img
            className="invert text-red-600 w-fit h-[3rem] hover:rotate-180 duration-200"
            src="https://img.icons8.com/pastel-glyph/64/000000/cat-back-view.png"
            alt=""
          />
          {/* <div className="w-fit hidden sm:inline-block">-</div> */}
          <div className={`w-fit ml-5 ${pacifico.className}`}>PowerBilla</div>
        </div>
        <div
          className={`w-fit text-4xl hidden md:block md:mb-5 ${pacifico.className}`}
        >
          Experience the Best Notebook
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-fit z-10 mx-auto md:mr-10 h-fit md:sticky md:top-10">
          <div className="flex flex-row justify-evenly">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                onClick={() => {
                  navigator.vibrate(150);
                  setFontsize("text-lg");
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
                  navigator.vibrate(150);
                  setFontsize("text-4xl");
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
              navigator.vibrate(150);
              setTextareaNotes(inputRef.current.value);
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
              navigator.vibrate(150);
              navigator.clipboard.writeText(inputRef.current.value);
              // alert("Clipboard has been updated");
              setOpen(true);
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
        <textarea
          className={`bg-black h-[84vh] outline-none text-left overflow-hidden hover:overflow-y-scroll md:sticky md:top-10 border-2 ${fontsize} p-3 mb-8 md:m-0 md:p-10 w-full rounded-xl`}
          ref={inputRef}
          placeholder="Enter new notes here..."
          rows={30}
        />
      </div>
    </motion.div>
  );
};

export default LandingPage;
