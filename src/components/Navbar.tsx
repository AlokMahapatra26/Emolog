// components/Navbar.tsx (Client Component)
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/DarkModeToggle";
import { Home, User2, Brain, ChartArea, Menu, Database, Download, ArrowRightFromLine } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";


const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/user", label: "Profile", icon: User2 },
  { href: "/aitherapist", label: "AI Therapist", icon: Brain },
  { href: "/chart", label: "Your Data", icon: ChartArea },
];

interface Props {
  user: any; // type according to your auth setup
}

export const Navbar = ({ user }: Props) => {
  return (
    <header className="w-full bg-popover text-popover-foreground border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
  {/* Emotion-themed SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-primary"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
             10-4.48 10-10S17.52 2 12 2zm0 18c-4.41
             0-8-3.59-8-8s3.59-8 8-8 8 3.59 8
             8-3.59 8-8 8zm4-10c-.55 0-1 .45-1
             1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-8
             0c-.55 0-1 .45-1 1s.45 1 1 1
             1-.45 1-1-.45-1-1-1zm4 6c2.33
             0 4.31-1.46 5.11-3.5H6.89C7.69
             14.54 9.67 16 12 16z" />
  </svg>
  EMOLOG
</Link>


        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <SheetTitle asChild>
                <VisuallyHidden>
                  <span>Navigation Menu</span>
                </VisuallyHidden>
              </SheetTitle>
              <MobileMenu user={user} />
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <NavLinks isMobile={false} />
              <ModeToggle />
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const NavLinks = ({ isMobile }: { isMobile: boolean }) => {
    const pathname = usePathname();
  
    return (
      <div className={`flex ${isMobile ? "flex-col w-full gap-2 p-6" : "flex-wrap items-center gap-2"}`}>
        <Button
          variant={pathname === "/" ? "default" : "outline"}
          className={`flex items-center gap-1 ${isMobile ? "w-full justify-start" : ""}`}
          asChild
        >
          <Link href="/">
            <Home className="w-4 h-4" /> <span>Home</span>
          </Link>
        </Button>
  
        <Button
          variant={pathname === "/user" ? "default" : "outline"}
          className={`flex items-center gap-1 ${isMobile ? "w-full justify-start" : ""}`}
          asChild
        >
          <Link href="/user">
            <User2 className="w-4 h-4" /> <span>Profile</span>
          </Link>
        </Button>
  
        <Button
          variant={pathname === "/aitherapist" ? "default" : "outline"}
          className={`flex items-center gap-1 ${isMobile ? "w-full justify-start" : ""}`}
          asChild
        >
          <Link href="/aitherapist">
            <Brain className="w-4 h-4" /> <span>AI Therapist</span>
          </Link>
        </Button>

          <form action="/api/download-journal" method="post">
      <Button
        type="submit"
        variant={"outline"}
        className={`flex items-center gap-1 ${isMobile ? "w-full justify-start" : ""}`}
      >
        <ArrowRightFromLine className="w-4 h-4" />
        <span>Export Data</span>
      </Button>
    </form>
     


  
        <Button
          variant={pathname === "/chart" ? "default" : "outline"}
          className={`flex items-center gap-1 ${isMobile ? "w-full justify-start" : ""}`}
          asChild
        >
          <Link href="/chart">
            <ChartArea className="w-4 h-4" /> <span>Day Graph</span>
          </Link>
        </Button>


      </div>
    );
  };

const MobileMenu = ({ user }: Props) => (
  <div className="flex flex-col gap-3 mt-4 w-full">
    {user ? (
      <>
        <NavLinks isMobile={true} />
        <div className="w-full p-6">
          <ModeToggle />
        </div>
      </>
    ) : (
      <>
        <Button asChild className="w-full">
          <Link href="/signup">Signup</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      </>
    )}
  </div>
);
