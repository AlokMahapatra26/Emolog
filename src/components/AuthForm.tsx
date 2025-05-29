"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CardContent } from "./ui/card"
import { CardFooter } from "./ui/card"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signupAction , loginAction } from "@/actions/users"

type Props = {
    type : "login" | "signup"
}

function AuthForm({type}:Props) {

    const isLoginForm = type === "login"

    const router = useRouter()

    const [isPending , startTransition] =  useTransition();

    const handleSubmit = (formData : FormData) => {
        startTransition(async () => {

            const displayName = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            let errorMessage;
            let title;
            let description;

            if(isLoginForm){
                errorMessage = (await loginAction(email , password)).errorMessage;
                title = "Logged in";
                description = "You have been succesfully logged in"
            }else{
                errorMessage = (await signupAction(displayName , email , password)).errorMessage;
                title = "Signed up";
                description = "Check your email for a confirmation link"
            }

            if(!errorMessage){
                toast.success(title , {description : description})
                router.replace("/")
            }else{
                toast.error("Error" , {description : errorMessage})
            }
        })
    }
    

  return (
    <form action={handleSubmit}>
        <CardContent className="grid w-full items-center gap-4">

             { !isLoginForm ? <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="email">Name</Label> */}
            <Input id="name" name="name" placeholder="Enter your name" type="text" required disabled={isPending} className="p-6"/>
            </div> : ""}

            <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="email">Email</Label> */}
            <Input id="email" name="email" placeholder="Enter your email" type="email" required disabled={isPending} className="p-6"/>
            </div>
             <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="password">Password</Label> */}
            <Input id="password" name="password" placeholder="Enter your password" type="password" required disabled={isPending} className="p-6"/>
            </div>
            
        </CardContent>
        <br />
        <CardFooter className="mt-4 flex flex-col gap-6">
            <Button className="w-full p-6">{isPending ? ( <Loader2 className="animate-spin"/> ) : isLoginForm ? "Login" : "Sign Up"}</Button>
            <p className="text-xs">
                {isLoginForm ? "Dont have an account yet ? " : "Already have an account ? "}{"  "}
                <Link className={`underline text-blue-500 ${isPending ? " pointer-event-none opacity-50" : ""}`} href={isLoginForm ? "/signup" : "/login"}>{isLoginForm ? "signup" : "login"}</Link>
            </p>
        </CardFooter>
    </form>
  )
}

export default AuthForm



