"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading, please wait...
        </motion.p>
      </div>
    
  );
};

export default Loading;
