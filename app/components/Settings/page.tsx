"use client";

import React from "react";
import { motion } from "framer-motion";
import heart from "../../assets/heart.png";
import Image from "next/image";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const Settings = () => {
  return (
    <motion.div
      // initial={{ opacity: 0}}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0, y: 100 }}
      // transition={{ duration: 0.5 }}
      className="bg-black min-h-screen w-full text-white p-3 py-10 md:p-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-5xl mb-10 font-semibold font-serif ${pacifico.className}`}
      >
        Settings
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`text-xl mb-10 font-semibold font-serif ${pacifico.className}`}
      >
        <div>Version: V2.1</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`text-white hidden md:flex flex-row items-center bg-transparent text-2xl w-fit h-fit fixed md:bottom-12 md:left-48 ${pacifico.className}`}
      >
        - Made with
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Image src={heart} className="w-fit h-8 m-1" alt="" />
        </motion.div>
        by Rishab Mandal & designed with Paawan Kapdi
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`text-white md:hidden items-center bg-transparent text-2xl w-fit h-fit fixed bottom-5 left-5 ${pacifico.className}`}
      >
        <div className="flex flex-row">
          - Made with
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image src={heart} className="w-fit h-8 ml-1" alt="" />
          </motion.div>
        </div>
        <div className="text-left">
          by Rishab Mandal & designed with Paawan Kapdi
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
