
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { ModeToggle } from "@/components/DarkModeToggle";
import { getUser } from "@/auth/server";
import { User2 , ChartArea, Brain , Home} from "lucide-react";

async function Header() {

  const user = await getUser();
  
  
  

  return (
    <header className="w-full bg-popover text-popover-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          EMOLOG
        </Link>

        {/* Desktop Menu */}
        <nav className=" md:flex items-center gap-4">
          
          {user ? (
            <>
          <Button variant="outline" className="ml-2" asChild>
            <Link href="/"><Home/></Link>
          </Button>
          <Button variant="outline" className="ml-2" asChild>
            <Link href="/user"><User2/></Link>
          </Button>
          <Button variant="outline" className="ml-2" asChild>
            <Link href="/aitherapist"><Brain/></Link>
          </Button>
          <Button variant="outline" className="ml-2" asChild>
            <Link href="/chart"><ChartArea/></Link>
          </Button>

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
}

export default Header;