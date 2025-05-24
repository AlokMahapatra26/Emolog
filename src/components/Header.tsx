
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { ModeToggle } from "@/components/DarkModeToggle";
import LogoutButton from "@/components/LogoutButton";
import { getUser } from "@/auth/server";
import { User2 } from "lucide-react";

async function Header() {

  const user = await getUser();
  
  console.log(user)
  

  return (
    <header className="w-full bg-popover text-popover-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          EMOLOG
        </Link>

        {/* Desktop Menu */}
        <nav className=" md:flex items-center gap-4">
          {user ? (
            ""
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
          <ModeToggle />
          {
            user ? <Link href="/user">
          <Button variant="outline" className="ml-2">
            
            <User2/>
          </Button>
          </Link> : ""
          }
          
          
        </nav>

       
      </div>

      
      
    </header>
  );
}

export default Header;