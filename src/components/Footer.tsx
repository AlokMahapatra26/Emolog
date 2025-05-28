// components/Footer.tsx
import React from "react";
import { Heart, Github, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 mt-10 bg text-center text-sm bg-popover">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href={"https://github.com/AlokMahapatra26"}>
         <p className="flex items-center gap-1">
          Made with <Heart className="h-4 w-4 text-rose-500" fill="currentColor" /> for your mind by{" "}
          <span className="font-medium text-zinc-800 dark:text-white underline transition-transform duration-300 hover:scale-110 hover:rotate-3">Alok </span>
        </p>
        </Link>
       

        <div className="flex gap-4">
          <Link
            href="https://github.com/AlokMahapatra26/Emolog/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            <Github className="h-5 w-5" />
          </Link>

          <Link
            href="mailto:alokmahapatra2604@gmail.com"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
